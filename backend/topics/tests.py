from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from topics.models import Topic, TopicApplication
from users.models import StudentGroup, StudentProfile, TeacherProfile

User = get_user_model()


class TopicModelTests(TestCase):
    def test_topic_status_properties(self):
        topic = Topic.objects.create(
            title="Test topic",
            status=Topic.Status.AVAILABLE,
        )

        self.assertTrue(topic.is_available)
        self.assertFalse(topic.is_pending_approval)
        self.assertFalse(topic.is_assigned)

        topic.status = Topic.Status.PENDING_APPROVAL
        topic.save(update_fields=["status"])

        self.assertFalse(topic.is_available)
        self.assertTrue(topic.is_pending_approval)
        self.assertFalse(topic.is_assigned)

        topic.status = Topic.Status.ASSIGNED
        topic.save(update_fields=["status"])

        self.assertFalse(topic.is_available)
        self.assertFalse(topic.is_pending_approval)
        self.assertTrue(topic.is_assigned)


class TopicApplicationApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.teacher = User.objects.create_user(
            username="teacher",
            password="password",
            role=User.Role.TEACHER,
            first_name="Petr",
            last_name="Petrov",
            middle_name="Petrovich",
        )
        TeacherProfile.objects.create(user=self.teacher)

        self.student = User.objects.create_user(
            username="student",
            password="password",
            role=User.Role.STUDENT,
            first_name="Ivan",
            last_name="Ivanov",
            middle_name="Ivanovich",
        )
        group = StudentGroup.objects.create(name="ИКБО-01-21")
        StudentProfile.objects.create(
            user=self.student,
            course=3,
            group=group,
        )

        self.topic = Topic.objects.create(
            title="Coursework topic",
            description="Test description",
            type=Topic.Type.COURSEWORK,
            status=Topic.Status.AVAILABLE,
            teacher=self.teacher,
        )

    def test_student_can_apply_to_available_topic(self):
        self.client.force_authenticate(user=self.student)

        response = self.client.post(reverse("topic-apply", args=[self.topic.id]))

        self.assertEqual(response.status_code, 200)

        self.topic.refresh_from_db()

        self.assertEqual(self.topic.status, Topic.Status.PENDING_APPROVAL)
        self.assertEqual(self.topic.student, self.student)
        self.assertEqual(TopicApplication.objects.count(), 1)

    def test_student_cannot_apply_to_assigned_topic(self):
        self.topic.status = Topic.Status.ASSIGNED
        self.topic.save(update_fields=["status"])

        self.client.force_authenticate(user=self.student)

        response = self.client.post(reverse("topic-apply", args=[self.topic.id]))

        self.assertEqual(response.status_code, 400)
        self.assertEqual(TopicApplication.objects.count(), 0)

    def test_student_cannot_have_two_active_applications(self):
        another_topic = Topic.objects.create(
            title="Another coursework topic",
            type=Topic.Type.COURSEWORK,
            status=Topic.Status.AVAILABLE,
            teacher=self.teacher,
        )

        TopicApplication.objects.create(
            topic=another_topic,
            student=self.student,
            status=TopicApplication.Status.PENDING,
        )

        self.client.force_authenticate(user=self.student)

        response = self.client.post(reverse("topic-apply", args=[self.topic.id]))

        self.assertEqual(response.status_code, 400)
        self.assertEqual(TopicApplication.objects.count(), 1)

    def test_student_cannot_apply_to_wrong_topic_type_for_course(self):
        self.topic.type = Topic.Type.VKR
        self.topic.save(update_fields=["type"])

        self.client.force_authenticate(user=self.student)

        response = self.client.post(reverse("topic-apply", args=[self.topic.id]))

        self.assertEqual(response.status_code, 404)
        self.assertEqual(TopicApplication.objects.count(), 0)

    def test_student_can_cancel_own_application(self):
        TopicApplication.objects.create(
            topic=self.topic,
            student=self.student,
            status=TopicApplication.Status.PENDING,
        )
        self.topic.status = Topic.Status.PENDING_APPROVAL
        self.topic.student = self.student
        self.topic.save(update_fields=["status", "student"])

        self.client.force_authenticate(user=self.student)

        response = self.client.post(reverse("topic-cancel", args=[self.topic.id]))

        self.assertEqual(response.status_code, 200)

        self.topic.refresh_from_db()

        self.assertEqual(self.topic.status, Topic.Status.AVAILABLE)
        self.assertIsNone(self.topic.student)
        self.assertEqual(TopicApplication.objects.count(), 0)

    def test_teacher_can_accept_application(self):
        application = TopicApplication.objects.create(
            topic=self.topic,
            student=self.student,
            status=TopicApplication.Status.PENDING,
        )
        self.topic.status = Topic.Status.PENDING_APPROVAL
        self.topic.student = self.student
        self.topic.save(update_fields=["status", "student"])

        self.client.force_authenticate(user=self.teacher)

        response = self.client.post(reverse("topic-accept", args=[self.topic.id]))

        self.assertEqual(response.status_code, 200)

        self.topic.refresh_from_db()
        application.refresh_from_db()

        self.assertEqual(self.topic.status, Topic.Status.ASSIGNED)
        self.assertEqual(application.status, TopicApplication.Status.APPROVED)

    def test_teacher_can_reject_application(self):
        application = TopicApplication.objects.create(
            topic=self.topic,
            student=self.student,
            status=TopicApplication.Status.PENDING,
        )
        self.topic.status = Topic.Status.PENDING_APPROVAL
        self.topic.student = self.student
        self.topic.save(update_fields=["status", "student"])

        self.client.force_authenticate(user=self.teacher)

        response = self.client.post(reverse("topic-reject", args=[self.topic.id]))

        self.assertEqual(response.status_code, 200)

        self.topic.refresh_from_db()
        application.refresh_from_db()

        self.assertEqual(self.topic.status, Topic.Status.AVAILABLE)
        self.assertIsNone(self.topic.student)
        self.assertEqual(application.status, TopicApplication.Status.REJECTED)

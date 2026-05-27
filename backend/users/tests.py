from django.contrib.auth import get_user_model
from django.test import TestCase

from users.models import StudentGroup, StudentProfile, TeacherProfile

User = get_user_model()


class UserModelTests(TestCase):
    def test_create_student_user(self):
        user = User.objects.create_user(
            username="student",
            password="password",
            role=User.Role.STUDENT,
            first_name="Ivan",
            last_name="Ivanov",
            middle_name="Ivanovich",
        )

        self.assertEqual(user.username, "student")
        self.assertEqual(user.role, User.Role.STUDENT)
        self.assertTrue(user.check_password("password"))
        self.assertEqual(user.get_full_name(), "Ivanov Ivan Ivanovich")

    def test_create_teacher_user(self):
        user = User.objects.create_user(
            username="teacher",
            password="password",
            role=User.Role.TEACHER,
            first_name="Petr",
            last_name="Petrov",
            middle_name="Petrovich",
        )

        profile = TeacherProfile.objects.create(user=user)

        self.assertEqual(user.role, User.Role.TEACHER)
        self.assertEqual(profile.user, user)
        self.assertEqual(str(profile), "Petrov Petr Petrovich")

    def test_create_student_profile_with_group(self):
        user = User.objects.create_user(
            username="student",
            password="password",
            role=User.Role.STUDENT,
            first_name="Ivan",
            last_name="Ivanov",
            middle_name="Ivanovich",
        )
        group = StudentGroup.objects.create(name="ИКБО-01-21")

        profile = StudentProfile.objects.create(
            user=user,
            course=3,
            group=group,
        )

        self.assertEqual(profile.user, user)
        self.assertEqual(profile.course, 3)
        self.assertEqual(profile.group, group)

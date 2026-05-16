from django.db import transaction

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Topic, TopicApplication
from .permissions import IsTeacherOwner, IsStudentRole
from .serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user

        queryset = Topic.objects.select_related(
            "teacher",
            "student",
            "student__student_profile",
            "student__student_profile__group",
        ).prefetch_related(
            "steps",
            "files",
            "applications",
        )

        if user.role == "teacher":
            queryset = queryset.filter(teacher=user)
            # фильтры по типу и статусу
            type_param = self.request.query_params.get("type")
            status_param = self.request.query_params.get("status")
            search = self.request.query_params.get("search")

            if type_param in [Topic.Type.COURSEWORK, Topic.Type.VKR]:
                queryset = queryset.filter(type=type_param)

            if status_param in [
                Topic.Status.AVAILABLE,
                Topic.Status.PENDING_APPROVAL,
                Topic.Status.ASSIGNED,
            ]:
                queryset = queryset.filter(status=status_param)

            if search:
                queryset = queryset.filter(title__icontains=search)

            return queryset

        elif user.role == "student":
            # автофильтр по курсу
            student_profile = getattr(user, "student_profile", None)
            course = getattr(student_profile, "course", None)
            if course in [1, 2, 3]:
                queryset = queryset.filter(type=Topic.Type.COURSEWORK)
            elif course == 4:
                queryset = queryset.filter(type=Topic.Type.VKR)
            else:
                return Topic.objects.none()

            status_param = self.request.query_params.get("status")
            teacher_param = self.request.query_params.get("teacher")
            search = self.request.query_params.get("search")
            if status_param in [
                Topic.Status.AVAILABLE,
                Topic.Status.PENDING_APPROVAL,
                Topic.Status.ASSIGNED,
            ]:
                queryset = queryset.filter(status=status_param)
            if teacher_param:
                queryset = queryset.filter(teacher_id=teacher_param)
            if search:
                queryset = queryset.filter(title__icontains=search)
            return queryset

        return Topic.objects.none()

    # def perform_create(self, serializer):
    #     serializer.save(teacher=self.request.user)

    def get_permissions(self):
        if self.action in ["apply", "cancel", "mytopic"]:
            return [IsAuthenticated(), IsStudentRole()]

        if self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
            "accept",
            "reject",
        ]:
            return [IsAuthenticated(), IsTeacherOwner()]
        return [IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        topic = self.get_object()

        if topic.status != Topic.Status.AVAILABLE:
            return Response(
                {"text": "Можно удалить только свободную тему"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if topic.applications.exists():
            return Response(
                {"text": "Нельзя удалить тему, по которой уже были заявки"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        self.perform_destroy(topic)

        return Response(
            {
                "success": True,
                "message": "Тема удалена",
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    @transaction.atomic
    def apply(self, request, pk=None):
        topic = self.get_object()
        user = request.user

        topic = Topic.objects.select_for_update().get(pk=topic.pk)

        if topic.status != Topic.Status.AVAILABLE:
            return Response(
                {"text": "Заявку можно подать только на свободную тему"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        student_profile = getattr(user, "student_profile", None)
        course = getattr(student_profile, "course", None)

        if course not in [1, 2, 3, 4]:
            return Response(
                {"text": "Некорректный курс студента"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        elif course in [1, 2, 3]:
            if topic.type != Topic.Type.COURSEWORK:
                return Response(
                    {"text": "Студенты 1–3 курса могут выбрать только курсовую работу"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        elif course == 4:
            if topic.type != Topic.Type.VKR:
                return Response(
                    {"text": "Студенты 4 курса могут выбрать только ВКР"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        has_active_application = TopicApplication.objects.filter(
            student=user,
            status__in=[
                TopicApplication.Status.PENDING,
                TopicApplication.Status.APPROVED,
            ],
        ).exists()

        if has_active_application:
            return Response(
                {"text": "У вас уже есть активная заявка или назначенная тема"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        TopicApplication.objects.create(
            topic=topic,
            student=user,
            status=TopicApplication.Status.PENDING,
        )

        topic.status = Topic.Status.PENDING_APPROVAL
        topic.student = user
        topic.save(update_fields=["status", "student"])

        return Response(
            {"text": "Заявка отправлена"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    @transaction.atomic
    def cancel(self, request, pk=None):
        topic = self.get_object()
        user = request.user

        topic = Topic.objects.select_for_update().get(pk=topic.pk)

        if topic.status != Topic.Status.PENDING_APPROVAL:
            return Response(
                {"text": "Отменить можно только заявку, ожидающую подтверждения"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if topic.student_id != user.id:
            return Response(
                {"text": "Можно отменить только свою заявку"},
                status=status.HTTP_403_FORBIDDEN,
            )

        application = TopicApplication.objects.filter(
            topic=topic,
            student=user,
            status=TopicApplication.Status.PENDING,
        ).first()

        if application is None:
            return Response(
                {"text": "Активная заявка не найдена"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.delete()

        topic.status = Topic.Status.AVAILABLE
        topic.student = None
        topic.save(update_fields=["status", "student"])

        return Response(
            {"text": "Заявка отменена"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    @transaction.atomic
    def accept(self, request, pk=None):
        topic = self.get_object()

        topic = Topic.objects.select_for_update().get(pk=topic.pk)

        if topic.status != Topic.Status.PENDING_APPROVAL:
            return Response(
                {"text": "Принять можно только заявку, ожидающую подтверждения"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if topic.student is None:
            return Response(
                {"text": "У темы нет заявителя"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application = TopicApplication.objects.filter(
            topic=topic,
            student=topic.student,
            status=TopicApplication.Status.PENDING,
        ).first()

        if application is None:
            return Response(
                {"text": "Активная заявка не найдена"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = TopicApplication.Status.APPROVED
        application.save(update_fields=["status"])

        topic.status = Topic.Status.ASSIGNED
        topic.save(update_fields=["status"])

        return Response(
            {"text": "Заявка принята"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    @transaction.atomic
    def reject(self, request, pk=None):
        topic = self.get_object()

        topic = Topic.objects.select_for_update().get(pk=topic.pk)

        if topic.status != Topic.Status.PENDING_APPROVAL:
            return Response(
                {"text": "Отклонить можно только заявку, ожидающую подтверждения"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if topic.student is None:
            return Response(
                {"text": "У темы нет заявителя"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application = TopicApplication.objects.filter(
            topic=topic,
            student=topic.student,
            status=TopicApplication.Status.PENDING,
        ).first()

        if application is None:
            return Response(
                {"text": "Активная заявка не найдена"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = TopicApplication.Status.REJECTED
        application.save(update_fields=["status"])

        topic.status = Topic.Status.AVAILABLE
        topic.student = None
        topic.save(update_fields=["status", "student"])

        return Response(
            {"text": "Заявка отклонена"},
            status=status.HTTP_200_OK,
        )
    
    @action(detail=False, methods=["get"])
    def mytopic(self, request):
        application = (
            TopicApplication.objects.select_related(
                "topic",
                "topic__teacher",
                "topic__student",
                "topic__student__student_profile",
                "topic__student__student_profile__group",
            )
            .prefetch_related(
                "topic__steps",
                "topic__files",
            )
            .filter(student=request.user)
            .order_by("-created_at")
            .first()
        )

        if application is None:
            return Response(
                {
                    "applicationStatus": None,
                    "topic": None,
                },
                status=status.HTTP_200_OK
            )
        
        return Response(
            {
                "applicationStatus": application.status,
                "topic": TopicSerializer(
                    application.topic,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK
        )

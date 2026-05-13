from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Topic
from .permissions import IsTeacherOwner
from .serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]

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
        if self.action in ["create", "update", "partial_update", "destroy"]:
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

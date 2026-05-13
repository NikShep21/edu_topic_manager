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

        if user.role == "teacher":
            qs = Topic.objects.filter(teacher=user)
            # фильтры по типу и статусу
            type_param = self.request.query_params.get("type")
            status_param = self.request.query_params.get("status")
            if type_param in [Topic.Type.COURSEWORK, Topic.Type.VKR]:
                qs = qs.filter(type=type_param)
            if status_param in [Topic.Status.AVAILABLE, Topic.Status.PENDING_APPROVAL, Topic.Status.ASSIGNED]:
                qs = qs.filter(status=status_param)
            search = self.request.query_params.get("search")
            if search:
                qs = qs.filter(title__icontains=search)
            return qs

        elif user.role == "student":
            # автофильтр по курсу
            course = getattr(user.studentprofile, "course", None)
            if course in [1, 2, 3]:
                qs = Topic.objects.filter(type=Topic.Type.COURSEWORK)
            elif course == 4:
                qs = Topic.objects.filter(type=Topic.Type.VKR)
            else:
                return Topic.objects.none()

            status_param = self.request.query_params.get("status")
            teacher_param = self.request.query_params.get("teacher")
            search = self.request.query_params.get("search")
            if status_param in [Topic.Status.AVAILABLE, Topic.Status.PENDING_APPROVAL, Topic.Status.ASSIGNED]:
                qs = qs.filter(status=status_param)
            if teacher_param:
                qs = qs.filter(teacher_id=teacher_param)
            if search:
                qs = qs.filter(title__icontains=search)
            return qs

        return Topic.objects.none()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy"]:
            self.permission_classes = [IsTeacherOwner]
        return super().get_permissions()

    # Удаление отдельного файла темы
    @action(detail=True, methods=["delete"], url_path="files/(?P<file_id>[^/.]+)")
    def delete_file(self, request, pk=None, file_id=None):
        topic = self.get_object()
        try:
            file_obj = topic.files.get(id=file_id)
            file_obj.file.delete(save=False)
            file_obj.delete()
            return Response({"text": "Файл удалён"}, status=status.HTTP_204_NO_CONTENT)
        except TopicFile.DoesNotExist:
            return Response({"text": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)

    # Добавление нового файла к теме
    @action(detail=True, methods=["post"], url_path="files")
    def add_file(self, request, pk=None):
        topic = self.get_object()
        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return Response({"text": "Файл не передан"}, status=status.HTTP_400_BAD_REQUEST)
        file_obj = TopicFile.objects.create(topic=topic, file=uploaded_file)
        serializer = TopicFileSerializer(file_obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .serializers import (
    UserReadSerializer, 
    UserCreateSerializer,
    TeacherListSerializer,
    StudentListSerializer,
)
from .permissions import IsAdminRole

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        if self.action == "students":
            return StudentListSerializer
        if self.action == "teachers":
            return TeacherListSerializer
        return UserReadSerializer

    def get_permissions(self):
        if self.action == "me":
            return [IsAuthenticated()]
        return [IsAdminRole()]

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = UserReadSerializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def students(self, request):
        queryset = User.objects.filter(
            role="student", 
            student_profile__isnull=False
        ).select_related("student_profile")

        course = request.query_params.get("course")
        group = request.query_params.get("group")
        search = request.query_params.get("search")

        if course:
            queryset = queryset.filter(student_profile__course=course)
        if group:
            queryset = queryset.filter(student_profile__group__icontains=group)
        if search:
            queryset = queryset.filter(
                Q(username__icontains=search) |
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(middle_name__icontains=search) |
                Q(email__icontains=search)
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
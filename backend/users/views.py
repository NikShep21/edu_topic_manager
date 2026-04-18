from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.pagination import StandardResultsSetPagination
from .models import (
    AcademicDegree,
    AcademicTitle,
    COURSE_CHOICES,
    JobTitle,
    StudentGroup,
)
from .permissions import IsAdminRole
from .serializers import (
    AcademicDegreeSerializer,
    AcademicTitleSerializer,
    JobTitleSerializer,
    StudentListSerializer,
    TeacherListSerializer,
    UserCreateSerializer,
    UserReadSerializer,
    UserUpdateSerializer,
)

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    pagination_class = StandardResultsSetPagination

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        if self.action in ["update", "partial_update"]:
            return UserUpdateSerializer
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
            role=User.Role.STUDENT,
            student_profile__isnull=False,
        ).select_related("student_profile", "student_profile__group")

        course = request.query_params.get("course")
        group = request.query_params.get("group")
        search = request.query_params.get("search")
        ordering = request.query_params.get("ordering", "fio")

        if course:
            queryset = queryset.filter(student_profile__course=course)

        if group:
            queryset = queryset.filter(student_profile__group_id=group)

        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(middle_name__icontains=search)
            )

        if ordering == "-fio":
            queryset = queryset.order_by("-last_name", "-first_name", "-middle_name")
        else:
            queryset = queryset.order_by("last_name", "first_name", "middle_name")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="students/filter-options")
    def student_filter_options(self, request):
        groups = list(
            StudentGroup.objects.filter(students__isnull=False)
            .distinct()
            .values("id", "name")
            .order_by("name")
        )

        return Response(
            {
                "groups": groups,
                "courses": [
                    {"id": course_id, "name": course_name}
                    for course_id, course_name in COURSE_CHOICES
                ],
            }
        )

    @action(detail=False, methods=["get"])
    def teachers(self, request):
        queryset = User.objects.filter(
            role=User.Role.TEACHER,
            teacher_profile__isnull=False,
        ).select_related(
            "teacher_profile",
            "teacher_profile__academic_degree",
            "teacher_profile__academic_title",
            "teacher_profile__job_title",
        )

        academic_degree = request.query_params.get("academic_degree")
        academic_title = request.query_params.get("academic_title")
        job_title = request.query_params.get("job_title")
        search = request.query_params.get("search")
        ordering = request.query_params.get("ordering", "fio")

        if academic_degree:
            queryset = queryset.filter(
                teacher_profile__academic_degree_id=academic_degree
            )

        if academic_title:
            queryset = queryset.filter(
                teacher_profile__academic_title_id=academic_title
            )

        if job_title:
            queryset = queryset.filter(teacher_profile__job_title_id=job_title)

        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(middle_name__icontains=search)
            )

        if ordering == "-fio":
            queryset = queryset.order_by("-last_name", "-first_name", "-middle_name")
        else:
            queryset = queryset.order_by("last_name", "first_name", "middle_name")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="teachers/filter-options")
    def teacher_filter_options(self, request):
        academic_degrees = AcademicDegree.objects.filter(
            teacher_profiles__isnull=False
        ).distinct()
        academic_titles = AcademicTitle.objects.filter(
            teacher_profiles__isnull=False
        ).distinct()
        job_titles = JobTitle.objects.filter(teacher_profiles__isnull=False).distinct()

        return Response(
            {
                "academic_degrees": AcademicDegreeSerializer(
                    academic_degrees, many=True
                ).data,
                "academic_titles": AcademicTitleSerializer(
                    academic_titles, many=True
                ).data,
                "job_titles": JobTitleSerializer(job_titles, many=True).data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        old_group = None
        old_academic_degree = None
        old_academic_title = None
        old_job_title = None

        if instance.role == User.Role.STUDENT and hasattr(instance, "student_profile"):
            old_group = instance.student_profile.group

        if instance.role == User.Role.TEACHER and hasattr(instance, "teacher_profile"):
            old_academic_degree = instance.teacher_profile.academic_degree
            old_academic_title = instance.teacher_profile.academic_title
            old_job_title = instance.teacher_profile.job_title

        self.perform_destroy(instance)

        if old_group and not old_group.students.exists():
            old_group.delete()

        if old_academic_degree and not old_academic_degree.teacher_profiles.exists():
            old_academic_degree.delete()

        if old_academic_title and not old_academic_title.teacher_profiles.exists():
            old_academic_title.delete()

        if old_job_title and not old_job_title.teacher_profiles.exists():
            old_job_title.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

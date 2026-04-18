from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from .models import (
    AcademicDegree,
    AcademicTitle,
    COURSE_CHOICES,
    JobTitle,
    StudentGroup,
    StudentProfile,
    TeacherProfile,
)

User = get_user_model()


class StudentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroup
        fields = ["id", "name"]


class AcademicDegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDegree
        fields = ["id", "name"]


class AcademicTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicTitle
        fields = ["id", "name"]


class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTitle
        fields = ["id", "name"]


class UserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "role",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    course = serializers.IntegerField(required=False)
    group = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=False,
        error_messages={
            "blank": 'Поле "group" не может быть пустым.',
            "invalid": 'Поле "group" должно быть строкой.',
        },
    )

    academic_degree = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "academic_degree" должно быть строкой.',
        },
    )
    academic_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "academic_title" должно быть строкой.',
        },
    )
    job_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "job_title" должно быть строкой.',
        },
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "role",
            "course",
            "group",
            "academic_degree",
            "academic_title",
            "job_title",
        ]
        extra_kwargs = {
            "username": {
                "required": True,
                "allow_blank": False,
                "error_messages": {
                    "required": 'Поле "username" обязательно.',
                    "blank": 'Поле "username" не может быть пустым.',
                },
            },
            "first_name": {
                "required": True,
                "allow_blank": False,
                "error_messages": {
                    "required": 'Поле "first_name" обязательно.',
                    "blank": 'Поле "first_name" не может быть пустым.',
                },
            },
            "last_name": {
                "required": True,
                "allow_blank": False,
                "error_messages": {
                    "required": 'Поле "last_name" обязательно.',
                    "blank": 'Поле "last_name" не может быть пустым.',
                },
            },
            "middle_name": {
                "required": True,
                "allow_blank": False,
                "error_messages": {
                    "required": 'Поле "middle_name" обязательно.',
                    "blank": 'Поле "middle_name" не может быть пустым.',
                },
            },
        }

    def validate(self, attrs):
        role = attrs.get("role")
        group_name = attrs.get("group")
        academic_degree_name = attrs.get("academic_degree")
        academic_title_name = attrs.get("academic_title")
        job_title_name = attrs.get("job_title")

        if isinstance(group_name, str):
            group_name = group_name.strip()
            if not group_name:
                group_name = None

        if isinstance(academic_degree_name, str):
            academic_degree_name = academic_degree_name.strip()
            if not academic_degree_name:
                academic_degree_name = None

        if isinstance(academic_title_name, str):
            academic_title_name = academic_title_name.strip()
            if not academic_title_name:
                academic_title_name = None

        if isinstance(job_title_name, str):
            job_title_name = job_title_name.strip()
            if not job_title_name:
                job_title_name = None

        valid_course_ids = {course_id for course_id, _ in COURSE_CHOICES}
        course = attrs.get("course")
        if course is not None and course not in valid_course_ids:
            raise serializers.ValidationError(
                {"course": "Недопустимое значение курса."}
            )

        if role == User.Role.STUDENT:
            if attrs.get("course") is None:
                raise serializers.ValidationError(
                    {"course": 'Поле "course" обязательно для студента.'}
                )

            if not group_name:
                raise serializers.ValidationError(
                    {"group": 'Поле "group" обязательно для студента.'}
                )

        attrs["_group_name"] = group_name
        attrs["_academic_degree_name"] = academic_degree_name
        attrs["_academic_title_name"] = academic_title_name
        attrs["_job_title_name"] = job_title_name

        attrs.pop("group", None)
        attrs.pop("academic_degree", None)
        attrs.pop("academic_title", None)
        attrs.pop("job_title", None)

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")

        course = validated_data.pop("course", None)
        group_name = validated_data.pop("_group_name", None)

        academic_degree_name = validated_data.pop("_academic_degree_name", None)
        academic_title_name = validated_data.pop("_academic_title_name", None)
        job_title_name = validated_data.pop("_job_title_name", None)

        group = None
        if group_name:
            group, _ = StudentGroup.objects.get_or_create(name=group_name)

        academic_degree = None
        if academic_degree_name:
            academic_degree, _ = AcademicDegree.objects.get_or_create(
                name=academic_degree_name
            )

        academic_title = None
        if academic_title_name:
            academic_title, _ = AcademicTitle.objects.get_or_create(
                name=academic_title_name
            )

        job_title = None
        if job_title_name:
            job_title, _ = JobTitle.objects.get_or_create(name=job_title_name)

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if user.role == User.Role.STUDENT:
            StudentProfile.objects.create(
                user=user,
                course=course,
                group=group,
            )

        elif user.role == User.Role.TEACHER:
            TeacherProfile.objects.create(
                user=user,
                academic_degree=academic_degree,
                academic_title=academic_title,
                job_title=job_title,
            )

        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    course = serializers.IntegerField(required=False)
    group = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=False,
        error_messages={
            "blank": 'Поле "group" не может быть пустым.',
            "invalid": 'Поле "group" должно быть строкой.',
        },
    )

    academic_degree = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "academic_degree" должно быть строкой.',
        },
    )
    academic_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "academic_title" должно быть строкой.',
        },
    )
    job_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        error_messages={
            "invalid": 'Поле "job_title" должно быть строкой.',
        },
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "course",
            "group",
            "academic_degree",
            "academic_title",
            "job_title",
            "is_active",
            "is_staff",
        ]
        extra_kwargs = {
            "username": {
                "required": False,
                "error_messages": {
                    "blank": 'Поле "username" не может быть пустым.',
                },
            },
            "first_name": {
                "required": False,
                "error_messages": {
                    "blank": 'Поле "first_name" не может быть пустым.',
                },
            },
            "last_name": {
                "required": False,
                "error_messages": {
                    "blank": 'Поле "last_name" не может быть пустым.',
                },
            },
            "middle_name": {
                "required": False,
                "error_messages": {
                    "blank": 'Поле "middle_name" не может быть пустым.',
                },
            },
            "email": {"required": False},
            "is_active": {"required": False},
            "is_staff": {"required": False},
        }

    def validate(self, attrs):
        role = self.instance.role

        group_provided = "group" in self.initial_data
        academic_degree_provided = "academic_degree" in self.initial_data
        academic_title_provided = "academic_title" in self.initial_data
        job_title_provided = "job_title" in self.initial_data

        group_name = attrs.get("group") if group_provided else None
        academic_degree_name = (
            attrs.get("academic_degree") if academic_degree_provided else None
        )
        academic_title_name = (
            attrs.get("academic_title") if academic_title_provided else None
        )
        job_title_name = attrs.get("job_title") if job_title_provided else None

        if isinstance(group_name, str):
            group_name = group_name.strip()
            if not group_name:
                group_name = None

        if isinstance(academic_degree_name, str):
            academic_degree_name = academic_degree_name.strip()
            if not academic_degree_name:
                academic_degree_name = None

        if isinstance(academic_title_name, str):
            academic_title_name = academic_title_name.strip()
            if not academic_title_name:
                academic_title_name = None

        if isinstance(job_title_name, str):
            job_title_name = job_title_name.strip()
            if not job_title_name:
                job_title_name = None

        valid_course_ids = {course_id for course_id, _ in COURSE_CHOICES}
        course = attrs.get("course")
        if course is not None and course not in valid_course_ids:
            raise serializers.ValidationError(
                {"course": "Недопустимое значение курса."}
            )

        if role == User.Role.STUDENT:
            final_course = attrs.get(
                "course",
                getattr(
                    getattr(self.instance, "student_profile", None), "course", None
                ),
            )
            final_group_name = group_name
            if not group_provided:
                current_group = getattr(
                    getattr(self.instance, "student_profile", None), "group", None
                )
                final_group_name = current_group.name if current_group else None

            if final_course is None:
                raise serializers.ValidationError(
                    {"course": 'Поле "course" обязательно для студента.'}
                )

            if not final_group_name:
                raise serializers.ValidationError(
                    {"group": 'Поле "group" обязательно для студента.'}
                )

        attrs["_group_name"] = group_name if group_provided else None
        attrs["_group_provided"] = group_provided
        attrs["_academic_degree_name"] = (
            academic_degree_name if academic_degree_provided else None
        )
        attrs["_academic_degree_provided"] = academic_degree_provided

        attrs["_academic_title_name"] = (
            academic_title_name if academic_title_provided else None
        )
        attrs["_academic_title_provided"] = academic_title_provided

        attrs["_job_title_name"] = job_title_name if job_title_provided else None
        attrs["_job_title_provided"] = job_title_provided

        attrs.pop("group", None)
        attrs.pop("academic_degree", None)
        attrs.pop("academic_title", None)
        attrs.pop("job_title", None)
        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        course = validated_data.pop("course", None)
        group_name = validated_data.pop("_group_name", None)
        group_provided = validated_data.pop("_group_provided", False)

        academic_degree_name = validated_data.pop("_academic_degree_name", None)
        academic_degree_provided = validated_data.pop(
            "_academic_degree_provided", False
        )

        academic_title_name = validated_data.pop("_academic_title_name", None)
        academic_title_provided = validated_data.pop("_academic_title_provided", False)

        job_title_name = validated_data.pop("_job_title_name", None)
        job_title_provided = validated_data.pop("_job_title_provided", False)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        if instance.role == User.Role.STUDENT:
            student_profile = instance.student_profile
            old_group = student_profile.group

            if course is not None:
                student_profile.course = course

            if group_provided:
                new_group, _ = StudentGroup.objects.get_or_create(name=group_name)
                student_profile.group = new_group

            student_profile.save()

            if (
                old_group
                and old_group != student_profile.group
                and not old_group.students.exists()
            ):
                old_group.delete()

        elif instance.role == User.Role.TEACHER:
            teacher_profile = instance.teacher_profile

            old_academic_degree = teacher_profile.academic_degree
            old_academic_title = teacher_profile.academic_title
            old_job_title = teacher_profile.job_title

            if academic_degree_provided:
                if academic_degree_name is None:
                    teacher_profile.academic_degree = None
                else:
                    new_academic_degree, _ = AcademicDegree.objects.get_or_create(
                        name=academic_degree_name
                    )
                    teacher_profile.academic_degree = new_academic_degree

            if academic_title_provided:
                if academic_title_name is None:
                    teacher_profile.academic_title = None
                else:
                    new_academic_title, _ = AcademicTitle.objects.get_or_create(
                        name=academic_title_name
                    )
                    teacher_profile.academic_title = new_academic_title

            if job_title_provided:
                if job_title_name is None:
                    teacher_profile.job_title = None
                else:
                    new_job_title, _ = JobTitle.objects.get_or_create(
                        name=job_title_name
                    )
                    teacher_profile.job_title = new_job_title

            teacher_profile.save()

            if (
                old_academic_degree
                and old_academic_degree != teacher_profile.academic_degree
                and not old_academic_degree.teacher_profiles.exists()
            ):
                old_academic_degree.delete()

            if (
                old_academic_title
                and old_academic_title != teacher_profile.academic_title
                and not old_academic_title.teacher_profiles.exists()
            ):
                old_academic_title.delete()

            if (
                old_job_title
                and old_job_title != teacher_profile.job_title
                and not old_job_title.teacher_profiles.exists()
            ):
                old_job_title.delete()

        return instance


class StudentListSerializer(serializers.ModelSerializer):
    course = serializers.IntegerField(source="student_profile.course")
    group = StudentGroupSerializer(source="student_profile.group", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "role",
            "course",
            "group",
        ]


class TeacherListSerializer(serializers.ModelSerializer):
    academic_degree = AcademicDegreeSerializer(
        source="teacher_profile.academic_degree",
        read_only=True,
    )
    academic_title = AcademicTitleSerializer(
        source="teacher_profile.academic_title",
        read_only=True,
    )
    job_title = JobTitleSerializer(
        source="teacher_profile.job_title",
        read_only=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "role",
            "academic_degree",
            "academic_title",
            "job_title",
        ]

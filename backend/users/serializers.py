from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from .models import COURSE_CHOICES, StudentGroup, StudentProfile, TeacherProfile

User = get_user_model()


class StudentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroup
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
    )
    academic_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    job_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
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

        if isinstance(group_name, str):
            group_name = group_name.strip()
            if not group_name:
                group_name = None

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
        attrs.pop("group", None)
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")

        course = validated_data.pop("course", None)
        group_name = validated_data.pop("_group_name", None)

        academic_degree = validated_data.pop("academic_degree", None)
        academic_title = validated_data.pop("academic_title", None)
        job_title = validated_data.pop("job_title", None)

        group = None
        if group_name:
            group, _ = StudentGroup.objects.get_or_create(name=group_name)

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
    )
    academic_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    job_title = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
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
        group_name = attrs.get("group") if group_provided else None

        if isinstance(group_name, str):
            group_name = group_name.strip()
            if not group_name:
                group_name = None

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
        attrs.pop("group", None)
        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        course = validated_data.pop("course", None)
        group_name = validated_data.pop("_group_name", None)
        group_provided = validated_data.pop("_group_provided", False)

        academic_degree = validated_data.pop("academic_degree", None)
        academic_title = validated_data.pop("academic_title", None)
        job_title = validated_data.pop("job_title", None)

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

            if academic_degree is not None:
                teacher_profile.academic_degree = academic_degree
            if academic_title is not None:
                teacher_profile.academic_title = academic_title
            if job_title is not None:
                teacher_profile.job_title = job_title

            teacher_profile.save()

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
    academic_degree = serializers.CharField(
        source="teacher_profile.academic_degree",
        allow_null=True,
    )
    academic_title = serializers.CharField(
        source="teacher_profile.academic_title",
        allow_null=True,
    )
    job_title = serializers.CharField(
        source="teacher_profile.job_title",
        allow_null=True,
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

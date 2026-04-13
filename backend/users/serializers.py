from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from .models import StudentProfile, TeacherProfile

User = get_user_model()


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
    group = serializers.CharField(required=False)

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
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "middle_name": {"required": True, "allow_blank": False},
        }

    def validate(self, attrs):
        role = attrs.get("role")

        if role == User.Role.STUDENT:
            if attrs.get("course") is None:
                raise serializers.ValidationError(
                    {"course": "Это поле обязательно для студента."}
                )
            if not attrs.get("group"):
                raise serializers.ValidationError(
                    {"group": "Это поле обязательно для студента."}
                )

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")

        course = validated_data.pop("course", None)
        group = validated_data.pop("group", None)

        academic_degree = validated_data.pop("academic_degree", None)
        academic_title = validated_data.pop("academic_title", None)
        job_title = validated_data.pop("job_title", None)

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
    group = serializers.CharField(required=False, allow_blank=True)

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
            "username": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "middle_name": {"required": False},
            "email": {"required": False},
            "is_active": {"required": False},
            "is_staff": {"required": False},
        }

    def validate(self, attrs):
        role = self.instance.role

        if role == User.Role.STUDENT:
            course = attrs.get(
                "course",
                getattr(
                    getattr(self.instance, "student_profile", None), "course", None
                ),
            )
            group = attrs.get(
                "group",
                getattr(getattr(self.instance, "student_profile", None), "group", None),
            )

            if course is None:
                raise serializers.ValidationError(
                    {"course": "Это поле обязательно для студента."}
                )
            if not group:
                raise serializers.ValidationError(
                    {"group": "Это поле обязательно для студента."}
                )

        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        course = validated_data.pop("course", None)
        group = validated_data.pop("group", None)

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

            if course is not None:
                student_profile.course = course
            if group is not None:
                student_profile.group = group

            student_profile.save()

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
    group = serializers.SerializerMethodField()

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

    def get_group(self, obj):
        return {"name": obj.student_profile.group}


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

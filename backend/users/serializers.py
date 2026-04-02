from rest_framework import serializers
from django.contrib.auth import get_user_model

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
        ]
        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "middle_name": {"required": True, "allow_blank": False},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user

class StudentListSerializer(serializers.ModelSerializer):
    course = serializers.IntegerField(source="studentprofile.course")
    group = serializers.CharField(source="studentprofile.group")

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
    academic_degree = serializers.CharField(source="teacherprofile.academic_degree", allow_null=True)
    academic_title = serializers.CharField(source="teacherprofile.academic_title", allow_null=True)
    job_title = serializers.CharField(source="teacherprofile.job_title", allow_null=True)

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

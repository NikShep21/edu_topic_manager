import json
from urllib import request

from django.db import transaction
from rest_framework import serializers

from .models import Topic, TopicStep, TopicFile
from users.serializers import StudentListSerializer, TeacherListSerializer


class TopicStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicStep
        fields = ["id", "order", "title"]


class TopicFileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="original_name", read_only=True)
    url = serializers.FileField(source="file", read_only=True)
    size = serializers.IntegerField(source="size", read_only=True)

    class Meta:
        model = TopicFile
        fields = ["id", "name", "url", "size"]


class TopicSerializer(serializers.ModelSerializer):
    teacher = TeacherListSerializer(read_only=True)
    student = StudentListSerializer(read_only=True)
    steps = TopicStepSerializer(many=True, required=False)
    files = TopicFileSerializer(many=True, read_only=True)
    delete_files_ids = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        write_only=True,
    )

    class Meta:
        model = Topic
        fields = [
            "id",
            "title",
            "description",
            "type",
            "status",
            "teacher",
            "student",
            "created_at",
            "steps",
            "files",
            "delete_files_ids",
        ]
        read_only_fields = ["teacher", "student", "status", "created_at", "files"]

    def to_internal_value(self, data):
        data = data.copy()

        if hasattr(data, "dict"):
            data = data.dict()

        steps = data.get("steps")
        if isinstance(steps, str) and steps:
            try:
                data["steps"] = json.loads(steps)
            except json.JSONDecodeError:
                raise serializers.ValidationError(
                    {"steps": "Неверный формат JSON для steps."}
                )

        delete_files_ids = data.get("delete_files_ids")
        if isinstance(delete_files_ids, str) and delete_files_ids:
            try:
                data["delete_files_ids"] = json.loads(delete_files_ids)
            except json.JSONDecodeError:
                raise serializers.ValidationError(
                    {
                        "delete_files_ids": (
                            "Поле delete_files_ids должно быть валидной JSON-строкой."
                        )
                    }
                )

        return super().to_internal_value(data)

    def validate_delete_files_ids(self, value):
        if len(value) != len(set(value)):
            raise serializers.ValidationError(
                "Поле delete_files_ids содержит дубликаты."
            )
        return value

    def _get_uploaded_files(self):
        request = self.context.get("request")
        if not request or not hasattr(request, "FILES"):
            return []
        # фильтруем None на всякий случай
        return [f for f in request.FILES.getlist("files") if f]

    @transaction.atomic
    def create(self, validated_data):
        steps_data = validated_data.pop("steps", [])
        validated_data.pop("delete_files_ids", None)

        request = self.context["request"]
        topic = Topic.objects.create(teacher=request.user, **validated_data)

        for step in steps_data:
            TopicStep.objects.create(topic=topic, **step)

        for uploaded_file in self._get_uploaded_files():
            TopicFile.objects.create(topic=topic, file=uploaded_file)

        return topic

    @transaction.atomic
    def update(self, instance, validated_data):
        validated_data.pop("type", None)

        steps_data = validated_data.pop("steps", None)
        delete_files_ids = validated_data.pop("delete_files_ids", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if steps_data is not None:
            instance.steps.all().delete()

            for step in steps_data:
                TopicStep.objects.create(topic=instance, **step)

        if delete_files_ids:
            topic_file_ids = set(
                instance.files.filter(id__in=delete_files_ids).values_list(
                    "id",
                    flat=True,
                )
            )
            requested_file_ids = set(delete_files_ids)
            invalid_file_ids = requested_file_ids - topic_file_ids

            if invalid_file_ids:
                invalid_ids = ", ".join(map(str, sorted(invalid_file_ids)))

                raise serializers.ValidationError(
                    {
                        "delete_files_ids": (
                            f"Файлы с id {invalid_ids} не найдены или не принадлежат этой теме."
                        )
                    }
                )

            files_to_delete = instance.files.filter(id__in=delete_files_ids)

            for topic_file in files_to_delete:
                topic_file.file.delete(save=False)
                topic_file.delete()

        for uploaded_file in self._get_uploaded_files():
            TopicFile.objects.create(topic=instance, file=uploaded_file)

        return instance

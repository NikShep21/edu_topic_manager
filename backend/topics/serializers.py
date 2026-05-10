from rest_framework import serializers
from .models import Topic, TopicStep, TopicFile


class TopicStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicStep
        fields = ["id", "order", "title"]


class TopicFileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="filename", read_only=True)
    url = serializers.FileField(source="file", read_only=True)

    class Meta:
        model = TopicFile
        fields = ["id", "name", "url"]


class TopicSerializer(serializers.ModelSerializer):
    steps = TopicStepSerializer(many=True, required=False)
    files = TopicFileSerializer(many=True, read_only=True)

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
        ]
        read_only_fields = ["teacher", "student", "status", "created_at", "files"]

    def create(self, validated_data):
        steps_data = validated_data.pop("steps", [])
        validated_data["teacher"] = self.context["request"].user
        topic = Topic.objects.create(**validated_data)
        for step in steps_data:
            TopicStep.objects.create(topic=topic, **step)
        return topic
    
    def update(self, instance, validated_data):
        validated_data.pop("type", None)
        steps_data = validated_data.pop("steps", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if steps_data is not None:
            instance.steps.all().delete()
            for step in steps_data:
                TopicStep.objects.create(topic=instance, **step)

        return instance

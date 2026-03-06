from rest_framework.viewsets import ModelViewSet
from .models import Topic
from .serializers import TopicSerializer


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
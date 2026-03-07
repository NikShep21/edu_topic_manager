from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from topics.views import TopicViewSet

router = DefaultRouter()

router.register("users", UserViewSet)
router.register("topics", TopicViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
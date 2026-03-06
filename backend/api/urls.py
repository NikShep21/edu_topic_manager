from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from topics.views import TopicViewSet

router = DefaultRouter()

router.register("users", UserViewSet)
router.register("topics", TopicViewSet)

urlpatterns = router.urls
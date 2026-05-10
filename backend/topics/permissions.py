from rest_framework.permissions import BasePermission


class IsTeacherOwner(BasePermission):
    """
    Разрешает редактирование/удаление темы только её преподавателю
    """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.teacher
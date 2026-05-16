from rest_framework.permissions import BasePermission


class IsTeacherOwner(BasePermission):
    """
    Разрешает действие только преподавателю.
    Для object-level действий дополнительно проверяет,
    что тема принадлежит текущему преподавателю.
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "teacher"
        )

    def has_object_permission(self, request, view, obj):
        return obj.teacher_id == request.user.id


class IsStudentRole(BasePermission):
    """
    Разрешает действие только студенту.
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "student"
        )


class IsTeacherRole(BasePermission):
    """
    Разрешает действие только преподавателю.
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "teacher"
        )

from django.contrib import admin
from .models import (
    AcademicDegree,
    AcademicTitle,
    JobTitle,
    StudentProfile,
    TeacherProfile,
    User,
    StudentGroup,
)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "role", "is_staff", "is_superuser")
    list_filter = ("role", "is_staff", "is_superuser")
    search_fields = ("username", "email")


@admin.register(StudentGroup)
class StudentGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(AcademicDegree)
class AcademicDegreeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(AcademicTitle)
class AcademicTitleAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(JobTitle)
class JobTitleAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


admin.site.register(StudentProfile)
admin.site.register(TeacherProfile)

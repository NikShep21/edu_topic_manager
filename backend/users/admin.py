from django.contrib import admin
from .models import User, StudentProfile, TeacherProfile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "role", "is_staff", "is_superuser")
    list_filter = ("role", "is_staff", "is_superuser")
    search_fields = ("username", "email")


admin.site.register(StudentProfile)
admin.site.register(TeacherProfile)

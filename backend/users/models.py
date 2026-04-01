from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError("The given username must be set")

        email = self.normalize_email(email)
        extra_fields.setdefault("role", User.Role.STUDENT)

        user = self.model(username=username, email=email, **extra_fields)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", User.Role.ADMIN)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("role") != User.Role.ADMIN:
            raise ValueError("Superuser must have role='admin'.")

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = "student", _("Студент")
        TEACHER = "teacher", _("Преподаватель")
        ADMIN = "admin", _("Администратор")
    first_name = models.CharField(
        max_length=150,
        blank=False,
        verbose_name=_("Имя"),
    )
    last_name = models.CharField(
        max_length=150,
        blank=False,
        verbose_name=_("Фамилия"),
    )
    middle_name = models.CharField(
        max_length=150,
        blank=False,
        verbose_name=_("Отчество"),
    )
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.STUDENT,
        verbose_name=_("Роль"),
    )
    email = models.EmailField(
        _("email address"),
        blank=True,
    )

    objects = UserManager()

    class Meta:
        verbose_name = _("Пользователь")
        verbose_name_plural = _("Пользователи")

    def __str__(self):
        full_name = self.get_full_name()
        return (
            f"{full_name} ({self.get_role_display()})"
            if full_name
            else f"{self.username} ({self.get_role_display()})"
        )

    def get_full_name(self):
        parts = [self.last_name, self.first_name, self.middle_name]
        return " ".join(part for part in parts if part).strip()


class StudentProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile",
        verbose_name=_("Пользователь"),
    )
    course = models.PositiveSmallIntegerField(verbose_name=_("Курс"))
    group = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name=_("Группа"),
    )

    class Meta:
        verbose_name = _("Профиль студента")
        verbose_name_plural = _("Профили студентов")

    def __str__(self):
        return f"{self.user.get_full_name()} (Курс {self.course}, Группа {self.group})"


class TeacherProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
        verbose_name=_("Пользователь"),
    )
    academic_degree = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        default=None,
        verbose_name=_("Ученая степень"),
    )
    academic_title = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        default=None,
        verbose_name=_("Ученое звание"),
    )
    job_title = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        default=None,
        verbose_name=_("Должность"),
    )

    class Meta:
        verbose_name = _("Профиль преподавателя")
        verbose_name_plural = _("Профили преподавателей")

    def __str__(self):
        return self.user.get_full_name() or self.user.username

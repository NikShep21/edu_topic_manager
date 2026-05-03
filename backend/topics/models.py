from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Topic(models.Model):
    class Type(models.TextChoices):
        VKR = "vkr", _("ВКР")
        COURSEWORK = "coursework", _("Курсовая работа")


    class Status(models.TextChoices):
        AVAILABLE = "available", _("Доступна")
        PENDING_APPROVAL = "pending_approval", _("Ожидает подтверждения")
        ASSIGNED = "assigned", _("Назначена")

    title = models.CharField(
        max_length=255, 
        verbose_name=_("Название")
    )
    description = models.TextField(
        blank=True,
        verbose_name=_("Описание")
    )
    type = models.CharField(
        max_length=20,
        choices=Type.choices,
        default=Type.COURSEWORK,
        verbose_name=_("Тип темы")
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
        verbose_name=_("Статус")
    )
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="teacher_topics",
        verbose_name=_("Преподаватель")
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="student_topics",
        verbose_name=_("Студент")
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания")
    )

    class Meta:
        verbose_name = _("Тема")
        verbose_name_plural = _("Темы")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
    
    @property
    def is_available(self):
        return self.status == self.status.AVAILABLE
    
    @property
    def is_pending_approval(self):
        return self.status == self.status.PENDING_APPROVAL
    
    @property
    def is_assigned(self):
        return self.status == self.status.ASSIGNED
    

class TopicStep(models.Model):
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="steps",
        verbose_name=_("Тема")
    )
    order = models.PositiveIntegerField(
        verbose_name=_("Порядок")
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Название этапа")
    )
    description = models.TextField(
        blank=True,
        verbose_name=_("Описание этапа")
    )

    class Meta:
        verbose_name = _("Этап темы")
        verbose_name_plural = _("Этапы тем")
        ordering = ["order", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["topic", "order"],
                name="unique_topic_step_order"
            )
        ]
    

    def __str__(self):
        return f"{self.order}. {self.title}"
    

class TopicFile(models.Model):
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="files",
        verbose_name=_("Тема"),
    )
    file = models.FileField(
        upload_to="topics/",
        verbose_name=_("Файл"),
    )

    class Meta:
        verbose_name = _("Файл темы")
        verbose_name_plural = _("Файлы темы")
        ordering = ["id"]

    def __str__(self):
        return self.filename
    
    @property
    def filename(self):
        return self.file.name.split("/")[-1] if self.file else ""
    

class TopicApplication(models.Model):
    class status(models.TextChoices):
        PENDING = "pending", _("Ожидает решения")
        APPROVED = "approved", _("Одобрена")
        REJECTED = "rejected", _("Отклонена")

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name=_("Тема"),
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="topic_applications",
        verbose_name=_("Студент"),
    )
    status = models.CharField(
        max_length=20,
        choices=status.choices,
        default=status.PENDING,
        verbose_name=_("Статус заявки"),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания"),
    )

    class Meta:
        verbose_name = _("Заявка на тему")
        verbose_name_plural = _("Заявки на темы")
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["student", "-created_at"]),
            models.Index(fields=["topic", "status"]),
            models.Index(fields=["student", "status"]),
        ]

    def __str__(self):
        return f"{self.student} -> {self.topic} ({self.status})"
    
    @property
    def is_pending(self):
        return self.status == self.Status.PENDING

    @property
    def is_approved(self):
        return self.status == self.Status.APPROVED

    @property
    def is_rejected(self):
        return self.status == self.Status.REJECTED
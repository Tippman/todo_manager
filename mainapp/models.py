from django.db import models

from authapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, verbose_name='Имя проекта')
    vcs_url = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')
    title = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todo_author')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title[:10]

from django.db import models
from authapp.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import logging

logger = logging.getLogger('crud_models')


class Project(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название проекта проекта')
    vcs_url = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

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


@receiver(post_save, sender=Project)
@receiver(post_save, sender=TODO)
def save_model_log(sender, instance, created, **kwargs):
    msg = ''
    if created:
        if isinstance(instance, Project):
            msg = f'new Project "{instance}" created'
        elif isinstance(instance, TODO):
            msg = f'new ToDo "{instance}" created'
    else:
        if isinstance(instance, Project):
            msg = f'Project "{instance}" updated'
        elif isinstance(instance, TODO):
            msg = f'ToDo "{instance}" updated'
    if msg:
        logger.info(msg)
    return None


@receiver(post_delete, sender=Project)
@receiver(post_delete, sender=TODO)
def delete_model_log(sender, instance, **kwargs):
    msg = ''
    if isinstance(instance, Project):
        msg = f'Project "{instance}" was deleted'
    elif isinstance(instance, TODO):
        msg = f'ToDo "{instance}" was deleted'
    if msg:
        logger.info(msg)
    return None

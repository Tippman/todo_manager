from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db import models
from uuid import uuid4
import logging

logger = logging.getLogger('crud_models')


class User(AbstractUser):
    avatar = models.ImageField(upload_to='authapp/users_avatars', blank=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username


@receiver(post_save, sender=User)
def save_model_log(sender, instance, created, **kwargs):
    if created:
        logger.info('new User "%s" created', instance)
    else:
        logger.info('User "%s" updated', instance)
    return None


@receiver(post_delete, sender=User)
def delete_model_log(sender, instance, **kwargs):
    logger.info('User "%s" was deleted', instance)
    return None

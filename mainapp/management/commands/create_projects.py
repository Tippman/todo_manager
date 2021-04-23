import random

from django.core.management import BaseCommand
from faker import Faker
from faker import factory
from mainapp.models import Project, TODO
from authapp.models import User


class Command(BaseCommand):
    help = 'Creates N projects with faker'

    def add_arguments(self, projects_count):
        projects_count.add_argument('projects_count', nargs=1, type=int)

    def handle(self, *args, **options):
        projects_count = options['projects_count'][0]
        faker = Faker(['ru-RU'])
        users_count = User.objects.all().count()
        for _ in range(projects_count):
            new_project = Project.objects.create(
                name=faker.sentence(nb_words=3),
            )
            new_project.save()
            random_ids = [random.randint(1, users_count) for i in range(random.randint(1,10))]
            users = [user.id for user in User.objects.filter(id__in=random_ids)]
            new_project.users.add(*users)

        self.stdout.write('Success creating projects - x{}!'.format(projects_count))

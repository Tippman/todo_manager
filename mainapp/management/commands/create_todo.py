import random

from django.core.management import BaseCommand
from faker import Faker
from faker import factory
from mainapp.models import Project, TODO
from authapp.models import User
from time import time


class Command(BaseCommand):
    help = 'Creates N todoes with faker'

    def add_arguments(self, todo_count):
        todo_count.add_argument('todo_count', nargs=1, type=int)

    def handle(self, *args, **options):
        todo_count = options['todo_count'][0]
        faker = Faker(['ru_RU'])
        users_count = User.objects.all().count()
        projects_count = Project.objects.all().count()

        for _ in range(todo_count):
            project_id = random.randint(1, projects_count)
            project = Project.objects.get(id=project_id)
            author_id = random.randint(1, users_count)
            if author_id in project.users.values_list('project__users__id', flat=True):
                print('already')
            else:
                project.users.add(author_id)

            new_todo = TODO.objects.create(
                title=faker.sentence(nb_words=10),
                created_at=faker.date_between(start_date='-1y', end_date='today'),
                updated_at=time(),
                is_active=True,
                author_id=author_id,
                project=project,
            )
            new_todo.save()

        self.stdout.write('Success creating tasks - x{}!'.format(todo_count))

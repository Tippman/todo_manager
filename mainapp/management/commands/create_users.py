from django.core.management import BaseCommand
from faker import Faker
from authapp.models import User


class Command(BaseCommand):
    help = 'Creates N users with faker'

    def add_arguments(self, users_count):
        users_count.add_argument('users_count', nargs=1, type=int)

    def handle(self, *args, **options):
        users_count = options['users_count'][0]
        faker = Faker(['ru_RU'])
        user_names = [faker.unique.user_name() for i in range(users_count)]
        emails = [faker.unique.email() for i in range(users_count)]
        for n in range(users_count):
            new_user = User.objects.create(
                is_superuser=False,
                username=user_names[n],
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=emails[n],
                is_staff=False,
                is_active=True,
                date_joined=faker.date_between(start_date='-1y', end_date='today')
            )
            new_user.set_password('qwerty12')
            new_user.save()

        self.stdout.write('Success creating users - x{}!'.format(users_count))

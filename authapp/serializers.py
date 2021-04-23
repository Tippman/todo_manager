from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from authapp.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        # fields = ['url', 'username', 'first_name', 'last_name', 'email']
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserProfileSerializer(ModelSerializer):
    pass

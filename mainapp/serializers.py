from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from mainapp.models import Project, TODO


class TODOModelSerializer(ModelSerializer):
    project_name = StringRelatedField(many=False, source='project')
    author_name = StringRelatedField(many=False, source='author')

    class Meta:
        model = TODO
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    usernames = StringRelatedField(many=True, source='users')
    tasks = TODOModelSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = '__all__'

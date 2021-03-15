from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from mainapp.models import Project, TODO


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(HyperlinkedModelSerializer):
    # project = ProjectModelSerializer

    class Meta:
        model = TODO
        fields = '__all__'

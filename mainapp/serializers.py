from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from mainapp.models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    project = StringRelatedField(many=False)

    class Meta:
        model = TODO
        fields = '__all__'

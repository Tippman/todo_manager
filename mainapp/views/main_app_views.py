from rest_framework import mixins
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from mainapp.models import Project, TODO
from mainapp.serializers import ProjectModelSerializer, TODOModelSerializer
from mainapp.filters import ProjectFilter, TODOFilter
import logging

logger = logging.getLogger('crud_models')


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPaination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    # permission_classes = [IsAuthenticated]


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPaination
    filterset_class = TODOFilter

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.is_active = False
        obj.save()
        serializer = TODOModelSerializer(instance=obj, context={'request': request})
        logger.info('ToDo "%s" status set on "non-active"', obj.title)
        return Response(serializer.data)

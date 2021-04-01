from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as authtoken_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from authapp.views.auth_views import UserViewSet
from mainapp.views.main_app_views import ProjectModelViewSet, TODOModelViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', TODOModelViewSet)

urlpatterns = (
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    # path('api-token-auth/', authtoken_views.obtain_auth_token),
    path('api/', include(router.urls)),
)

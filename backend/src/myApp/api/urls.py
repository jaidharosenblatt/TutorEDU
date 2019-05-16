from django.contrib import admin
from django.urls import path, include
from .views import CurrentUser, UserListView, UserDetailView, AppointmentListView, AppointmentDetailView, CourseListView, CourseDetailView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('users/', UserListView.as_view()),
    path('users/<pk>', UserDetailView.as_view()),
    path('appointments/', AppointmentListView.as_view()),
    path('appointments/<pk>', AppointmentDetailView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/<pk>', CourseDetailView.as_view()),
    path('get-token/', obtain_jwt_token),
    path('refresh-token/', refresh_jwt_token),
    path('current-user/',CurrentUser),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

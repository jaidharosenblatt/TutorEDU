from django.contrib import admin
from django.urls import path, include
from .views import (ProfilePictureDetailView, ProfilePictureView,
CurrentUserView, LoginUserView, RegisterUserView, UserListView,
 UserDetailView, AppointmentListView, AppointmentDetailView, CourseListView, CourseDetailView)
# from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('users/', UserListView.as_view()),
    path('users/<pk>', UserDetailView.as_view()),
    path('appointments/', AppointmentListView.as_view()),
    path('appointments/<pk>', AppointmentDetailView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/<pk>', CourseDetailView.as_view()),
    path('current-user/',CurrentUserView.as_view()),
    path('register/',RegisterUserView.as_view()),
    path('login/',LoginUserView.as_view()),
    path('images/', ProfilePictureView.as_view()),
    path('images/<pk>', ProfilePictureDetailView.as_view()),
]

from django.contrib import admin
from django.urls import path, include
from .views import LoginUserView, RegisterUserView, CurrentUser, UserListView, UserDetailView, AppointmentListView, AppointmentDetailView, CourseListView, CourseDetailView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/', UserListView.as_view()),

    path('users/<pk>', UserDetailView.as_view()),
    path('appointments/', AppointmentListView.as_view()),
    path('appointments/<pk>', AppointmentDetailView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/<pk>', CourseDetailView.as_view()),
    path('get-token/', obtain_auth_token),
    path('current-user/',CurrentUser),
    path('register/',RegisterUserView.as_view()),
    path('login/',LoginUserView.as_view()),

]

from django.contrib import admin
from django.urls import path, include
from .views import UserListView, UserDetailView, AppointmentListView, AppointmentDetailView, CourseListView, CourseListView

urlpatterns = [
    path('users/', UserListView.as_view()),
    path('users/<pk>', UserDetailView.as_view()),
    path('appointments/', CourseListView.as_view()),
    path('appointments/<pk>', AppointmentListView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/<pk>', UserDetailView.as_view()),
]

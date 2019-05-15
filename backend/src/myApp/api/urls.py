from django.contrib import admin
from django.urls import path, include
from .views import UserListView, UserDetailView, AppointmentListView, AppointmentDetailView, CourseListView, CourseDetailView

urlpatterns = [
    path('users/', UserListView.as_view()),
    path('users/<pk>', UserDetailView.as_view()),
    path('appointments/', AppointmentListView.as_view()),
    path('appointments/<pk>', AppointmentDetailView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/<pk>', CourseDetailView.as_view()),
]

from django.contrib.auth.models import AbstractUser
from django.db import models

class Course(models.Model):
    id = models.IntegerField(default='1', blank=True, primary_key=True)
    name = models.CharField(default='blank', blank=True, max_length=40)
    description = models.CharField(default='blank', blank=True, max_length=2000)
    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    name = models.CharField(default='blank', blank=True, max_length=40)
    email = models.EmailField(default='blank', unique=True)
    university = models.CharField(default='blank', blank=True, max_length=40)
    bio = models.CharField(default='blank', blank=True, max_length=2000)
    report_card = models.CharField(default='blank', blank=True, max_length=2000)
    client_rating = models.IntegerField(default='5', blank=True)
    is_tutor = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    tutor_rating = models.IntegerField(default='5', blank=True)
    hourly_rate = models.FloatField(null=True, blank=True, default=None)
    availabilities = models.CharField(default='blank', blank=True, max_length=2000)
    courses = models.ManyToManyField(Course, related_name='user_courses',blank=True)

    def __str__(self):
        return self.email

class Appointment(models.Model):
    id = models.IntegerField(default='5', blank=True, primary_key=True)
    additional_comments = models.CharField(default='blank', blank=True, max_length=200)
    availabilities = models.CharField(default='blank', blank=True, max_length=2000)
    date = models.DateField(("Date"), auto_now_add=True)
    location = models.CharField(default='blank', blank=True, max_length=40)
    status = models.CharField(default='blank', blank=True, max_length=40)
    is_active = models.BooleanField(default=True)
    rating = models.IntegerField(default='5', blank=True)
    tutor = models.ForeignKey(CustomUser,related_name='tutor_appointments', on_delete=models.CASCADE, null=True,blank=True)
    student = models.ForeignKey(CustomUser,related_name='student_appointments', on_delete=models.CASCADE, null=True,blank=True)
    course = models.ForeignKey(Course,related_name='course_appointments', on_delete=models.CASCADE, null=True, blank=True)

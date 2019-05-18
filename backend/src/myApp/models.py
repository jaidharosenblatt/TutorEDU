from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)

class Course(models.Model):
    name = models.CharField(default='blank', blank=True, max_length=40)
    description = models.CharField(default='blank', blank=True, max_length=2000)
    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_image', blank=True, default='default-profile.png')
    name = models.CharField(default='blank', blank=True, max_length=40)
    email = models.EmailField(default='blank', unique=True)
    year = models.CharField(default='blank', blank=True, max_length=40)
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

class Appointment(models.Model):
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

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Course,Appointment

admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(Appointment)

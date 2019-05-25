from rest_framework import serializers
from myApp.models import Appointment, Course, CustomUser
from django.contrib.auth import authenticate

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'tutor', 'student', 'course', 'additional_comments', 'availabilities', 'is_active','date', 'location', 'status', 'rating')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description')

class UserSerializer(serializers.ModelSerializer):
    tutor_appointments = AppointmentSerializer(many=True,required=False)
    student_appointments = AppointmentSerializer(many=True,required=False)
    courses = CourseSerializer(many=True,required=False)

    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name', 'courses','profile_image','year', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    tutor_appointments = AppointmentSerializer(many=True,required=False)
    student_appointments = AppointmentSerializer(many=True,required=False)
    courses = CourseSerializer(many=True,required=False)

    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name', 'courses','profile_image','year',
        'password', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
          return user
        raise serializers.ValidationError("Incorrect Credentials")

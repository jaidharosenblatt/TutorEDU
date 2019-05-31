from rest_framework import serializers
from myApp.models import Appointment, Course, CustomUser, Photo
from django.contrib.auth import authenticate

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['image','user','id']
        read_only_fields = ('user',)
    def __init__(self, *args, **kwargs):
        super(ProfilePictureSerializer, self).__init__(*args, **kwargs)
        self.fields['image'].required = False

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'tutor', 'student', 'course', 'additional_comments', 'availabilities', 'is_active','date', 'location', 'status', 'rating')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description')

class UserSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(
        queryset= Course.objects.all(), many=True,required=False)
    class Meta:
        model = CustomUser
        fields = ('id','email', 'tutor_appointments', 'student_appointments','username','name', 'courses','profile_image','year', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(
        queryset= Course.objects.all(), many=True,required=False)
    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name', 'courses','year',
        'password', 'university','bio', 'client_rating', 'tutor_appointments', 'student_appointments',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','courses','report_card')
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

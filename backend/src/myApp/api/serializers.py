from rest_framework import serializers
from myApp.models import Appointment, Course, CustomUser

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'tutor', 'student', 'course', 'additional_comments', 'availabilities', 'is_active','date', 'location', 'status', 'rating')

class CourseSerializer(serializers.ModelSerializer):
    course_appointments = AppointmentSerializer(many=True,required=False)
    user_courses= serializers.StringRelatedField(many=True,required=False)
    class Meta:
        model = Course
        fields = ('id', 'course_name', 'description','course_appointments','user_courses')

class UserSerializer(serializers.ModelSerializer):
    tutor_appointments = AppointmentSerializer(many=True,required=False)
    student_appointments = AppointmentSerializer(many=True,required=False)
    courses = CourseSerializer(many=True,required=False)

    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name',
        'password', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

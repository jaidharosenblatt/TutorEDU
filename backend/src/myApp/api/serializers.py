from rest_framework import serializers
from myApp.models import Appointment, Course, CustomUser
from rest_framework_jwt.settings import api_settings


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'tutor', 'student', 'course', 'additional_comments', 'availabilities', 'is_active','date', 'location', 'status', 'rating')

class CourseSerializer(serializers.ModelSerializer):
    course_appointments = AppointmentSerializer(many=True,required=False)
    user_courses= serializers.StringRelatedField(many=True,required=False)
    class Meta:
        model = Course
        fields = ('id', 'name', 'description','course_appointments','user_courses')

class UserSerializer(serializers.ModelSerializer):
    tutor_appointments = AppointmentSerializer(many=True,required=False)
    student_appointments = AppointmentSerializer(many=True,required=False)
    courses = CourseSerializer(many=True,required=False)

    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name', 'courses',
        'password', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    tutor_appointments = AppointmentSerializer(many=True,required=False)
    student_appointments = AppointmentSerializer(many=True,required=False)
    courses = CourseSerializer(many=True,required=False)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        fields = ('id','email', 'username','name', 'courses',
        'password', 'university','bio', 'client_rating',
        'is_tutor','is_active', 'tutor_rating','hourly_rate','availabilities','tutor_appointments','student_appointments','courses','report_card')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

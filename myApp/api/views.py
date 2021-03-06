from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from myApp.models import Photo, CustomUser,Course, Appointment
from .serializers import ProfilePictureSerializer, UserSerializer,CourseSerializer,AppointmentSerializer, RegisterSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics,permissions
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser
from django.http import HttpResponse


# @api_view(['GET'])
# def CurrentUser(request):
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)
class ProfilePictureView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProfilePictureSerializer
    parser_classes = (FormParser,MultiPartParser, FileUploadParser)
    def perform_create(self, serializer):
        maxID = CustomUser.objects.all().order_by("-id")[0].id
        serializer.save(user=CustomUser.objects.get(pk=maxID))
        return HttpResponse('')

class ProfilePictureDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProfilePictureSerializer
    parser_classes = (FormParser,MultiPartParser, FileUploadParser)
    queryset = Photo.objects.all()

class CurrentUserView(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  permission_classes = permissions.IsAuthenticated,
  def get_object(self):
    return self.request.user

class RegisterUserView(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

class LoginUserView(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })
class UserListView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class CourseListView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(RetrieveUpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class AppointmentListView(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetailView(RetrieveUpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

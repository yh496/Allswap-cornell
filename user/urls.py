from django.urls import path, include
from .views import UserRegistrationView, UserLoginView, UserProfileView


urlpatterns = [
    path('signup/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', UserProfileView.as_view())
    ]
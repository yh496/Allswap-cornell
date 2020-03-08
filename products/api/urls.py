from django.urls import path, include

from products.api.views import ProductListAPIView
from rest_framework import routers



urlpatterns = [
    path('',ProductListAPIView.as_view()),
]


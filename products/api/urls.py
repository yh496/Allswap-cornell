from django.urls import path, include

from products.api.views import (
    ProductListAPIView, 
    ProductCreateAPIView,
    userProductListAPIView,
    userProductDetailAPIView,
)
from rest_framework import routers



urlpatterns = [
    path('',ProductListAPIView.as_view()),
    path('upload/', ProductCreateAPIView.as_view()),
    path('<slug:id>/', userProductListAPIView.as_view()),
    path('detail/<int:pk>/', userProductDetailAPIView.as_view()),
]


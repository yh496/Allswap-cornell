from django.urls import path, include

from products.api.views import ProductListAPIView, userProductListView
from rest_framework import routers



urlpatterns = [
    path('',ProductListAPIView.as_view()),
    path('<slug:slug>/', userProductListView.as_view()),
]


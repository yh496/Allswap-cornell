from rest_framework import viewsets
from products.models import Product
from .serializers import ProductSerializer
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status
from rest_framework.response import Response

from allswap import settings

class ProductListAPIView(generics.ListCreateAPIView):    
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication


    def perform_create(self, serializer, **kwargs):
        kwargs['user']=self.request.user
        serializer.save(**kwargs)  


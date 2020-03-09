from rest_framework import viewsets
from products.models import Product
from .serializers import ProductSerializer
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly
from user.models import User

from allswap import settings

class ProductListAPIView(generics.ListAPIView):    
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductCreateAPIView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def perform_create(self, serializer, **kwargs):
        kwargs['user']=self.request.user
        serializer.save(**kwargs)  


class userProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get_queryset(self):
        user = self.request.user 
        
        #userID = self.kwargs['id']
        return Product.objects.filter(user = user)

class userProductDetailAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    authentication_class = JSONWebTokenAuthentication
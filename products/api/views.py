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



class userProductListView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication
    def get(self, request):
        try:
            user_products = Product.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User products fetched successfully',
                'data': [{
                    'title': user_products.title,
                    'content': user_products.content,
                    'price': user_products.price,
                    }]
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)

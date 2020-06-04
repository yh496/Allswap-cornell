from rest_framework import serializers
from products.models import Product
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')

class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Product
        fields = ('id','user','title','content','price')


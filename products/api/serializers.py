from rest_framework import serializers
from products.models import Product
from user.models import User


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default = serializers.CurrentUserDefault())
    class Meta:
        model = Product
        fields = ('id','user','title','content','price')

       

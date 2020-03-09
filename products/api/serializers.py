from rest_framework import serializers
from products.models import Product
from user.models import UserProfile

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id']  

        
class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(default = serializers.CurrentUserDefault())
    class Meta:
        model = Product
        fields = ('id','user','title','content','price')

       

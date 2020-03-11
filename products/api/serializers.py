from rest_framework import serializers
from products.models import Product
from user.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','email']  

        
class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(default = serializers.CurrentUserDefault())
    image = serializers.ImageField(required=False)
    

    class Meta:
        model = Product
        fields = ('id','user','title','content','price','image')

       

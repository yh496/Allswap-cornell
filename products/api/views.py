from rest_framework import viewsets
from products.models import Product
from .serializers import ProductSerializer
from rest_framework import generics
from allswap import settings

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class userProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Product.objects.filter(user__username = username)
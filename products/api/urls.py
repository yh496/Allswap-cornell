from django.urls import path, include

from products.api.views import ProductViewSet, userProductListView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('<slug:username>/products/', userProductListView.as_view()),
]


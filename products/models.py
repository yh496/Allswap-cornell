from django.db import models
from django.conf import settings
# Create your models here.
class Product(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete = models.CASCADE)
    title = models.CharField(max_length = 120)
    content = models.TextField()
    price = models.IntegerField()
    
    def __str__(self):
        return self.title
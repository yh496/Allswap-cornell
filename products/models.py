from django.db import models
# Create your models here.

class Product(models.Model):
    objects = models.Manager()
    user = models.ForeignKey('auth.User', related_name = 'user_products', on_delete = models.CASCADE)
    title = models.CharField(max_length = 120)
    content = models.TextField()
    price = models.IntegerField()
    
    def __str__(self):
        return self.title
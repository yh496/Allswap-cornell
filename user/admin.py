from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


# Register your models here.
from .models import User
class MyUserAdmin(UserAdmin):
    model = User
    list_display = ('email','password')  # Contain only fields in your `custom-user-model`
    list_filter = ('email','password')  # Contain only fields in your `custom-user-model` intended for filtering. Do not include `groups`since you do not have it
    search_fields = ('email','password')  # Contain only fields in your `custom-user-model` intended for searching
    ordering = ('email','password')  # Contain only fields in your `custom-user-model` intended to ordering
    filter_horizontal = () # Leave it empty. You have neither `groups` or `user_permissions`
    fieldsets = ((None, {'fields': ('email','password',)}),
    )
    add_fieldsets = (
            (None, {'fields': ('email','password1','password2')}),
    )
admin.site.register(User,MyUserAdmin)
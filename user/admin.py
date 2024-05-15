from django.contrib import admin
from .models import UserProfile

# Register your models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['fullname', 'phone_number', 'address']
    search_fields = ['fullname', 'phone_number', 'address']
    list_filter = ['gender']
admin.site.register(UserProfile, UserProfileAdmin)
from django.db import models, IntegrityError
from django.contrib.auth.models import AbstractUser


GENDER_CHOICES = (
    ('M', 'Nam'),
    ('F', 'Nữ'),
    ('O', 'Giới tính khác'),
)
    
class UserProfile(AbstractUser):
    # Add additional fields here
    fullname = models.CharField(max_length=50, blank=True, default="")
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    phone_number = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    banglai = models.ImageField(upload_to='banglai/', null=True, blank=True)

    def get_full_name(self):
        return self.fullname
    
    def get_short_name(self):
        return self.username

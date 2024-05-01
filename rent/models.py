from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class XeMay(models.Model):
    ten = models.CharField(max_length=100)
    gia = models.IntegerField()
    dia_diem = models.ForeignKey('DiaDiem', related_name='ds_xemay', on_delete=models.CASCADE)
    da_duoc_thue = models.BooleanField(default=False)
    dang_hong = models.BooleanField(default=False)
    def __str__(self):
        return self.ten
    
class DiaDiem(models.Model):
    ten = models.CharField(max_length=100)

    def __str__(self):
        return self.ten
    
    @property
    def ds_xe_hienco(self):
        return self.ds_xe.filter(da_duoc_thue=False, dang_hong=False)

def get_default_dia_diem():
    return DiaDiem.objects.get(ten='Sài Gòn').id

class ThueXe(models.Model):
    dia_diem = models.ForeignKey(DiaDiem, related_name='ds_thue', on_delete=models.CASCADE, default=get_default_dia_diem)
    xe = models.ForeignKey(XeMay, related_name='ds_thue', on_delete=models.CASCADE)
    nguoi_thue = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    ngay_thue = models.DateTimeField(auto_now_add=True)
    ngay_tra = models.DateTimeField()
    da_tra = models.BooleanField(default=False)
    
    def __str__(self):
        return "Thue {} cua {}".format(self.xe.ten, self.nguoi_thue.username)
    

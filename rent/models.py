from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
import requests
# Create your models here.
class XeMay(models.Model):
    ten = models.CharField(max_length=20)
    gia = models.IntegerField()
    dia_diem = models.ForeignKey('DiaDiem', related_name='ds_xemay', on_delete=models.CASCADE)
    da_duoc_thue = models.BooleanField(default=False)
    dang_hong = models.BooleanField(default=False)
    loai_xe = models.CharField(max_length=50, blank=True)
    def __str__(self):
        return self.ten
    
    def clean(self):
        allowed_names = ['sirius', 'vision', 'airblade','winnerx']
        if not any(name in self.ten.lower() for name in allowed_names):
            raise ValidationError("Tên xe máy phải chứa một trong các từ sau: 'sirius', 'vision', 'airblade', 'winnnerx'")

    def save(self, *args, **kwargs):
        self.full_clean()
        if 'sirius' in self.ten.lower():
            self.loai_xe = 'Yamaha Sirius 110cc'
        if 'vision' in self.ten.lower():
            self.loai_xe = 'Honda Vision 110cc'
        if 'airblade' in self.ten.lower():
            self.loai_xe = 'Honda Air Blade 125cc'
        if 'winnerx' in self.ten.lower():
            self.loai_xe = 'Honda WinnerX 150cc'
        super().save(*args, **kwargs)
    
class DiaDiem(models.Model):
    ten = models.CharField(max_length=20)
    dia_chi_cu_the = models.CharField(max_length=200, default='Test địa chỉ cụ thể')
    def __str__(self):
        return self.ten
    
    @property
    def ds_xe_hienco(self):
        return self.ds_xemay.filter(da_duoc_thue=False, dang_hong=False)

    def get_min_vehicle_id(self):
        min_id_vehicle = self.ds_xe_hienco.order_by('id').first()
        return min_id_vehicle.id if min_id_vehicle else None
def get_default_dia_diem():
    return DiaDiem.objects.get(ten='Sài Gòn').id

class PhuKien(models.Model):
    ten = models.CharField(max_length=100)
    mota = models.TextField()
    gia = models.IntegerField()

    def __str__(self):
        return self.ten
class OrderPhuKien(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    phu_kien = models.ForeignKey(PhuKien, on_delete=models.CASCADE)
    so_luong = models.IntegerField()

class Order(models.Model):
    dia_diem = models.ForeignKey(DiaDiem, related_name='ds_order', on_delete=models.CASCADE, default=get_default_dia_diem)
    xe = models.ForeignKey(XeMay, related_name='ds_order', on_delete=models.CASCADE)
    nguoi_thue = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    ngay_thue = models.DateField()
    ngay_tra = models.DateField()
    diachi_nhanxe = models.CharField(max_length=100, blank=True)
    phu_phi = models.ManyToManyField(PhuKien, through=OrderPhuKien, blank=True)
    phi_diduongdai = models.IntegerField(default=0)
    phi_baohiem = models.IntegerField(default=0)
    bi_huy = models.BooleanField(default=False)
    tong_tien = models.IntegerField()
    def __str__(self):
        return "Thue {} cua {}".format(self.xe.ten, self.nguoi_thue.username)
    
    def getName(self):
        return f'Thuê {self.xe.loai_xe} tại {self.dia_diem} ngày {self.ngay_thue.strftime('%d/%m/%Y')}'
    @property
    def thoigian_thue(self):
        if self.ngay_thue and self.ngay_tra:
            return (self.ngay_tra - self.ngay_thue).days
        return 0

    def pending_payments(self):
        now = timezone.now()
        return self.payments.filter(expire__gte=now)

    def is_paid(self):
        return self.payments.filter(is_paid=True).exists()



def get_eth_price_in_vnd():
    response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd')
    data = response.json()
    return data['ethereum']['vnd']

def convert_price_to_amount(vnd):
    rate = get_eth_price_in_vnd()
    eth = vnd / rate
    return str(float(eth))

class Payment(models.Model):
    order = models.ForeignKey(Order, related_name='payments', on_delete=models.CASCADE)
    address = models.CharField(max_length=128, blank=True, null=True)
    amount = models.CharField(max_length=200, blank=True, null=True)

    is_paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.amount:
            self.amount = convert_price_to_amount(self.order.tong_tien)
        super(Payment, self).save(*args, **kwargs)

    def __str__(self):
        amount = float(self.amount)
        return f'{self.order} by {amount} ETH'

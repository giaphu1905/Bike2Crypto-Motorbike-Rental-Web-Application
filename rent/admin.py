from django.contrib import admin
#from .models import DiaDiem, XeMay, ThueXe, PhuKien
from .models import DiaDiem, XeMay, PhuKien, Order, Payment

# Register your models here.
class XeMayAdmin(admin.ModelAdmin):
    exclude = ('loai_xe',)

# class ThueXeAdmin(admin.ModelAdmin):
#     class Media:
#         js = ('admin/admin.js',)  # thay 'path/to/admin.js' bằng đường dẫn thực tế đến file admin.js

class OrderAdmin(admin.ModelAdmin):
    class Media:
        js = ('admin/admin.js',)
    @admin.display(boolean=True)
    def is_paid(self, obj):
        return obj.is_paid()

    list_display = ['dia_diem', 'xe', 'nguoi_thue', 'ngay_thue', 'ngay_tra', 'tong_tien', 'is_paid']
   

class PaymentAdmin(admin.ModelAdmin):
    @admin.action(description="Check received payments")
    def confirm(self, request, queryset):
        for obj in queryset:
            obj.confirm()

    list_display = ["__str__", "address", "amount", "is_paid"]
    actions = [confirm]

admin.site.register(DiaDiem)
admin.site.register(XeMay, XeMayAdmin)
admin.site.register(PhuKien)
admin.site.register(Order, OrderAdmin)
admin.site.register(Payment, PaymentAdmin)
from django.contrib import admin
#from .models import DiaDiem, XeMay, ThueXe, PhuKien
from .models import DiaDiem, XeMay, PhuKien, Order, Payment, OrderPhuKien
admin.site.site_header = "Trang quản lý xe, địa điểm và phụ kiện cho thuê"
admin.site.site_title = admin.site.site_header
# Register your models here.
class XeMayAdmin(admin.ModelAdmin):
    exclude = ('loai_xe',)  # không hiển thị
    list_display = ['ten','dia_diem']
    search_fields = ['ten', 'dia_diem__ten', 'loai_xe']
    list_filter = ['ten', 'dia_diem', 'loai_xe']

class DiaDiemAdmin(admin.ModelAdmin):
    list_display = ['ten', 'dia_chi_cu_the']


class OrderPhuKienInline(admin.TabularInline):
    model = OrderPhuKien
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    class Media:
        js = ('admin/admin.js',)
    @admin.display(boolean=True)
    def is_paid(self, obj):
        return obj.is_paid()
    is_paid.short_description = "Đã thanh toán"
    inlines = [OrderPhuKienInline]

    list_display = ['dia_diem', 'xe', 'nguoi_thue', 'ngay_thue', 'ngay_tra', 'tong_tien', 'is_paid', 'bi_huy']
    list_filter = ['dia_diem', 'nguoi_thue', 'ngay_thue', 'ngay_tra', 'bi_huy']

class PaymentAdmin(admin.ModelAdmin):
    search_fields = ["order__nguoi_thue__username", "address", "order__dia_diem__ten"]
    list_display = ["__str__", "address", "amount", "is_paid"]
    list_filter = ["is_paid"]

class PhuKienAdmin(admin.ModelAdmin):
    search_fields = ['ten']

admin.site.register(DiaDiem, DiaDiemAdmin)
admin.site.register(XeMay, XeMayAdmin)
admin.site.register(PhuKien, PhuKienAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Payment, PaymentAdmin)
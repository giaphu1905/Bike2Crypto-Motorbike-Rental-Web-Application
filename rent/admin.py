from django.contrib import admin
from .models import DiaDiem, XeMay, ThueXe
# Register your models here.
class ThueXeAdmin(admin.ModelAdmin):
    class Media:
        js = ('admin/admin.js',)  # thay 'path/to/admin.js' bằng đường dẫn thực tế đến file admin.js

admin.site.register(DiaDiem)
admin.site.register(XeMay)
admin.site.register(ThueXe, ThueXeAdmin)
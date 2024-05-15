from django.urls import path
from . import views
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

app_name = 'rent'

urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path("login/", views.Login.as_view(), name="login"),
    path("", RedirectView.as_view(url='home/', permanent=True)),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.Signup.as_view(), name='signup'),
    path('thue-xe-tai-<str:pickup_location>', views.ThueXeView.as_view(), name='thue-xe'),
    path('thue-xe-tai-<str:pickup_location>/phukien-<int:vehicle_id>', views.PhuKienView.as_view(), name='phu-kien'),
    path('thue-xe-tai-<str:pickup_location>/phukien-<int:vehicle_id>/contact', views.ContactView.as_view(), name='contact'),
    path('thue-xe-tai-<str:pickup_location>/phukien-<int:vehicle_id>/contact/confirm', views.ConfirmView.as_view(), name='confirm'),
    path('thue-xe-tai-<str:pickup_location>/phukien-<int:vehicle_id>/contact/confirm/success-<int:order_id>', views.ThanhCongView.as_view(), name='thanh-cong'),

    path('thanh-toan-order<int:order_id>-by-payment<int:payment_id>', views.PaymentView.as_view(), name='thanh-toan'),
    path('thanh-toan-order<int:order_id>-by-payment<int:payment_id>/success', views.ThanhCongPaymentView.as_view(), name='thanh-cong-payment'),
    path('rent/api/xe_may/', views.XeMayAPI.as_view(), name='xe_may_api'),

    path('sua-thong-tin-nhan-xe/', views.SuaThongTinNhanXe, name='sua-thong-tin-nhan-xe'),
    path('sua-thong-tin-tra-xe/', views.SuaThongTinTraXe, name='sua-thong-tin-tra-xe'),
    path('chon-dia-diem-at-home/', views.get_dia_diem_loai_xe, name='chon-dia-diem-at-home'),
    path('get-min-vehicle-id-at-location/', views.get_min_vehicle_id_at_location, name='get-min-vehicle_id'),
    
    path('chinh-sach-thue-xe-may/', views.ChinhSachThueXeMay, name='chinh-sach'),
    path('gioi-thieu/', views.GioiThieu, name='gioi-thieu'),
    path('lien-he/', views.LienHe, name='lien-he'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
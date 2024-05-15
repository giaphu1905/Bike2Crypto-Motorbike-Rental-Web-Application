from django.contrib import admin
from django.urls import path, include
from . import views

app_name = "user"

urlpatterns = [
    path('profile/', views.profile_user, name='profile_user'),
    path('invoices/', views.ds_hoadon, name='invoices'),
    path('invoices/search-order/', views.searchOrder, name='search-order'),
    path('invoices/order-detail-<int:id>/', views.ChiTietHoaDon, name='order-detail'),
    path('cancle-order-<int:id>/', views.cancel_order, name='cancle-order'),
    path('order-<int:id>-user-payment/', views.thanh_toan_user, name='payment-order'),
    path('profile/change-password/', views.change_password, name='change-password'),

]
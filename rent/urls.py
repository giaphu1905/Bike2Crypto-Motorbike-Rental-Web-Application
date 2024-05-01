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
    path('thue-xe-tai-/<int:pk>', views.ThueXeView.as_view(), name='thue-xe'),

    path('rent/api/xe_may/', views.XeMayAPI.as_view(), name='xe_may_api'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
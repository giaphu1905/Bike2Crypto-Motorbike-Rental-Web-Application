from django.shortcuts import redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import SignUpForm
from django.contrib import messages
from django.urls import reverse
from .models import DiaDiem

class Login(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True

    def get_success_url(self):
        if self.request.user.is_superuser:
            return reverse('admin:index')
        return reverse('rent:home')
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_login'] = self.request.user
        return context
def logout_view(request):
    logout(request)
    return redirect('rent:login')
    
class Signup(View):
    def get(self, request, *args, **kwargs):
        form = SignUpForm()
        return render(request, 'signup.html', {'form_signup': form})

    def post(self, request, *args, **kwargs):
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            print('dang ky thanh cong')
            return redirect(reverse('user:profile_user'))
        else:
            print('dang ky that bai')
            request.POST = {}
            return render(request, 'signup.html', {'form_signup': form})
from django.http import HttpResponse
class Home(LoginRequiredMixin, View):
    login_url = '/login/'
    redirect_field_name = 'next'

    def get(self, request):
        context = {
            'user_login': request.user,
            'dia_diems': DiaDiem.objects.all(),
        }
        return render(request, 'home.html', context)
    
    def post(self, request):
        # Xử lý yêu cầu POST ở đây
        print(request.POST)
        return HttpResponse("POST request received")
    
class ThueXeView(View):
    def post(self, request):
        # Lấy dữ liệu từ form
        pickup_location = request.POST.get('pickup-location')

        # Lưu dữ liệu vào cơ sở dữ liệu
        dia_diem = DiaDiem(ten=pickup_location)
        dia_diem.save()

        return HttpResponse("POST request received")

from django.http import JsonResponse
from .models import XeMay
class XeMayAPI(View):
    def get(self, request, *args, **kwargs):
        dia_diem_id = request.GET.get('dia_diem_id')
        xe_list = XeMay.objects.filter(dia_diem_id=dia_diem_id).values('id', 'ten')
        return JsonResponse(list(xe_list), safe=False)
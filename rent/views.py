from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.views import LoginView
from django.views import View
from django.contrib.auth import login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import SignUpForm
from django.urls import reverse
from .models import DiaDiem, Payment, PhuKien, XeMay, Order, OrderPhuKien
from django.http import JsonResponse
from user.forms import UserUpdateForm
from django.views.generic import FormView
from datetime import datetime, timedelta
from django.db.models import Min
class XeMayAPI(View):
    def get(self, request, *args, **kwargs):
        dia_diem_id = request.GET.get('dia_diem_id')
        xe_list = XeMay.objects.filter(dia_diem_id=dia_diem_id).values('id', 'ten')
        return JsonResponse(list(xe_list), safe=False)
    

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
        # Lấy dữ liệu từ form
        pickup_location = request.POST.get('pickup_location')
        request.session['rent_info'] = request.POST
        return redirect('rent:thue-xe', pickup_location=pickup_location)


def parse_date(date_string):
    formats = ["%Y-%m-%d", "%d/%m/%Y"]  # List of formats to try
    for fmt in formats:
        try:
            return datetime.strptime(date_string, fmt)
        except ValueError:
            continue
    raise ValueError(f"No valid date format found for {date_string}")

class ThueXeView(LoginRequiredMixin,View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        order_day = rent_info.get('order_day', datetime.now().strftime("%d/%m/%Y"))
        return_day = rent_info.get('return_day', (datetime.now() + timedelta(days=1)).strftime("%d/%m/%Y"))
        order_day_date = parse_date(order_day).date()
        return_day_date = parse_date(return_day).date()
        thoigian_thue = (return_day_date - order_day_date).days
        
        rent_info['thoigian_thue'] = thoigian_thue
        try:
            rent_info['order_day'] = order_day_date.strftime("%d/%m/%Y")
            rent_info['return_day'] = return_day_date.strftime("%d/%m/%Y")
        except:
            pass
        dia_diem_nhan_xe = DiaDiem.objects.get(ten=kwargs['pickup_location'])
        try:
            dia_diem_tra_xe = DiaDiem.objects.get(ten=rent_info['return_location'])
        except DiaDiem.DoesNotExist:
            dia_diem_tra_xe = dia_diem_nhan_xe
            rent_info['return_location']=kwargs['pickup_location']
        request.session['rent_info'] = rent_info
        ds_xemay = XeMay.objects.filter(dia_diem=dia_diem_nhan_xe, da_duoc_thue=False, dang_hong=False)
        
        ds_xemay = ds_xemay.values('loai_xe').annotate(id=Min('id')).order_by()
        ds_xemay = XeMay.objects.filter(id__in=[item['id'] for item in ds_xemay])
        print(ds_xemay.count())
        for xe in ds_xemay:
            print(xe.ten)
        context = {
            'rent_info': rent_info,
            'ds_xemay': ds_xemay,
            'dia_diems': DiaDiem.objects.all(),
            'user_login': request.user,
            'dia_diem_nhan_xe': dia_diem_nhan_xe,
            'dia_diem_tra_xe': dia_diem_tra_xe,
        }
        return render(request, 'rent/chucnangthuexe.html', context)
    
    def post(self, request, *args, **kwargs):
        pickup_location = kwargs.get('pickup_location')
        vehicle_id = request.POST.get('vehicle_id')
        return redirect('rent:phu-kien', pickup_location=pickup_location, vehicle_id=vehicle_id)

class PhuKienView(LoginRequiredMixin,View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        xe_thue = XeMay.objects.get(id=kwargs['vehicle_id'])
        rent_info['gia_thue_xemay'] = rent_info['thoigian_thue']*xe_thue.gia
        rent_info['xe_thue_id'] = kwargs['vehicle_id']
        request.session['rent_info'] = rent_info
        ds_phukien = PhuKien.objects.all()
        dia_diem_nhan_xe = DiaDiem.objects.get(ten=kwargs['pickup_location'])
        try:
            dia_diem_tra_xe = DiaDiem.objects.get(ten=rent_info['return_location'])
        except DiaDiem.DoesNotExist:
            dia_diem_tra_xe = dia_diem_nhan_xe
        context = {
            'rent_info': rent_info,
            'user_login': request.user,
            'dia_diems': DiaDiem.objects.all(),
            'dia_diem_nhan_xe': dia_diem_nhan_xe,
            'dia_diem_tra_xe': dia_diem_tra_xe,
            'ds_phukien': ds_phukien,
            'xe_thue': xe_thue,
        }
        return render(request, 'rent/phukien.html', context)
    def post(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})

        di_duong_dai = request.POST.get('xe_di_duong_dai', 0)
        bao_hiem = request.POST.get('phi_bao_hiem', 0)
        phu_kien_tens = [key.split('pk_')[1] for key in request.POST.keys() if key.startswith('pk_')]
        phu_kien_sl = [int(request.POST.get('pk_' + key)) for key in phu_kien_tens]
        phu_kien_gia = [
            PhuKien.objects.get(ten=ten).gia * rent_info['thoigian_thue'] * sl if PhuKien.objects.filter(ten=ten).exists() else 0
        for ten, sl in zip(phu_kien_tens, phu_kien_sl)
        ]

        rent_info['phu_kien_thue'] = [
            {'ten': ten, 'so_luong': sl, 'gia': gia}
            for ten, sl, gia in zip(phu_kien_tens, phu_kien_sl, phu_kien_gia)
            if sl > 0
        ]
        
        rent_info['di_duong_dai'] = int(di_duong_dai)*rent_info['thoigian_thue']
        rent_info['bao_hiem'] = int(bao_hiem)*rent_info['thoigian_thue']
        
        rent_info['tong_tien_thue'] = rent_info['gia_thue_xemay'] + sum([item['gia'] for item in rent_info['phu_kien_thue']]) + rent_info['di_duong_dai'] + rent_info['bao_hiem']
        request.session['rent_info'] = rent_info
        return redirect('rent:contact', pickup_location=kwargs.get('pickup_location'), vehicle_id=kwargs['vehicle_id'])
    
class ContactView(LoginRequiredMixin,View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        dia_diem_nhan_xe = DiaDiem.objects.get(ten=kwargs['pickup_location'])
        try:
            dia_diem_tra_xe = DiaDiem.objects.get(ten=rent_info['return_location'])
        except DiaDiem.DoesNotExist:
            dia_diem_tra_xe = dia_diem_nhan_xe
        xe_thue = XeMay.objects.get(id=kwargs['vehicle_id'])
        context = {
            'rent_info': rent_info,
            'user_login': request.user,
            'dia_diems': DiaDiem.objects.all(),
            'dia_diem_nhan_xe': dia_diem_nhan_xe,
            'dia_diem_tra_xe': dia_diem_tra_xe,
            'xe_thue': xe_thue,
        }
        if request.method == 'POST':
            form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
            if form.is_valid():
                instance = form.save(commit=False)
                instance.save()
            context['form'] = form
        else:
            form = UserUpdateForm(instance=request.user)
            context['form'] = form
        return render(request, 'rent/contact.html', context)
    def post(self, request, *args, **kwargs):
        is_checked = request.POST.get('cbtest-19') is not None 
        if is_checked:
            address = request.POST.get('address')  
        else:
            address = DiaDiem.objects.get(ten=kwargs['pickup_location']).dia_chi_cu_the
        request.session.get('rent_info', {})['address'] = address
        request.session.save()
        return redirect('rent:confirm', pickup_location=kwargs['pickup_location'], vehicle_id=kwargs['vehicle_id'])

class ConfirmView(LoginRequiredMixin,View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        dia_diem_nhan_xe = DiaDiem.objects.get(ten=kwargs['pickup_location'])
        try:
            dia_diem_tra_xe = DiaDiem.objects.get(ten=rent_info['return_location'])
        except DiaDiem.DoesNotExist:
            dia_diem_tra_xe = dia_diem_nhan_xe
        vehicle_id = kwargs['vehicle_id']
        context = {
            'rent_info': rent_info,
            'user_login': request.user,
            'dia_diem_nhan_xe': dia_diem_nhan_xe,
            'dia_diem_tra_xe': dia_diem_tra_xe,
            'loai_xe_thue': XeMay.objects.get(id=vehicle_id).loai_xe,
            'gia_thue': XeMay.objects.get(id=vehicle_id).gia,
        }
        return render(request, 'rent/xacnhan.html', context)
    def post(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        dia_diem = DiaDiem.objects.get(ten=kwargs['pickup_location']) 
        xeMay = XeMay.objects.get(id=kwargs['vehicle_id'])
        xeMay.da_duoc_thue = True
        xeMay.save()
        nguoi_thue = request.user
        order_day = datetime.strptime(rent_info.get('order_day'), "%d/%m/%Y").strftime("%Y-%m-%d")
        return_day = datetime.strptime(rent_info.get('return_day'), "%d/%m/%Y").strftime("%Y-%m-%d")
        is_checked = request.POST.get('cbtest-19') is not None 
        if is_checked:
            address = request.POST.get('address')  
        else:
            address = dia_diem.dia_chi_cu_the
        order = Order(
            dia_diem=dia_diem,
            xe=xeMay,
            nguoi_thue=nguoi_thue,
            ngay_thue=order_day,
            ngay_tra=return_day,
            diachi_nhanxe=address,
            tong_tien=rent_info['tong_tien_thue']

        )
        order.save()
        phu_kien_thue = rent_info.get('phu_kien_thue', [])
        for phu_kien in phu_kien_thue:
            phu_kien_obj = PhuKien.objects.get(ten=phu_kien['ten'])
            OrderPhuKien.objects.create(order=order, phu_kien=phu_kien_obj, so_luong=phu_kien['so_luong'])

        # Add di_duong_dai if not 0
        di_duong_dai = rent_info.get('di_duong_dai', 0)
        order.phi_diduongdai = di_duong_dai

        # Add bao_hiem if not 0
        bao_hiem = rent_info.get('bao_hiem', 0)
        order.phi_baohiem = bao_hiem
        order.save()
        return redirect('rent:thanh-cong', pickup_location=kwargs['pickup_location'], vehicle_id=kwargs['vehicle_id'], order_id=order.id)

from django.utils import timezone
class ThanhCongView(LoginRequiredMixin,View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        context = {
            'user_login': request.user,
            'rent_info': rent_info,
            'order_id': kwargs['order_id'],
        }
        return render(request, 'rent/thanhcong.html', context)
    def post(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=self.kwargs['order_id'])
        payment = Payment()
        payment.order = order
        payment.save()
        return redirect('rent:thanh-toan', order_id=kwargs['order_id'], payment_id=payment.id)


class PaymentView(FormView):
    def get(self, request, *args, **kwargs):
        rent_info = self.request.session.get('rent_info', {})
        payment = get_object_or_404(Payment, id=self.kwargs['payment_id'])
        context = {
            'user_login': request.user,
            'rent_info': rent_info,
            'order_id': kwargs['order_id'],
            'loai_xe_thue': XeMay.objects.get(id=rent_info['xe_thue_id']).loai_xe,
            'payment': payment,
        }
        # Add more context variables here
        return render(request, 'payment/thanhtoan.html', context)
    def post(self, request, *args, **kwargs):
        payment = get_object_or_404(Payment, id=self.kwargs['payment_id'])
        payment.address = request.POST.get('address-crypto')
        payment.is_paid = True
        payment.save()
        return JsonResponse({'status': 'success'})  

class ThanhCongPaymentView(View):
    def get(self, request, *args, **kwargs):
        rent_info = request.session.get('rent_info', {})
        context = {
            'user_login': request.user,
            'rent_info': rent_info,
            'order_id': kwargs['order_id'],
        }
        return render(request, 'payment/payment_thanhcong.html', context)

def SuaThongTinNhanXe(request):
    if request.method == 'POST':
        rent_info = request.session.get('rent_info', {})
        order_day = request.POST.get('order_day')
        order_day_date = parse_date(order_day).date()
        try:
            rent_info['order_day'] = order_day_date.strftime("%d/%m/%Y")
        except:
            pass
        pickup_location = request.POST.get('pickup_location')
        rent_info['pickup_location'] = pickup_location
        dia_diem_nhan_xe = DiaDiem.objects.get(ten=pickup_location)
        request.session['rent_info'] = rent_info
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def SuaThongTinTraXe(request):
    if request.method == 'POST':
        rent_info = request.session.get('rent_info', {})
        return_day = request.POST.get('return_day')
        return_day_date = parse_date(return_day).date()
        try:
            rent_info['return_day'] = return_day_date.strftime("%d/%m/%Y")
        except:
            pass
        return_location = request.POST.get('return_location')
        if return_location == 'Chọn địa điểm trả xe':
            return_location = rent_info['pickup_location']
        rent_info['return_location'] = return_location
        request.session['rent_info'] = rent_info
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def ChinhSachThueXeMay(request):
    user_login = request.user

    return render(request, 'other/chinhsach.html', {'user_login': user_login})
def GioiThieu(request):
    user_login = request.user

    return render(request, 'other/gioithieu.html', {'user_login': user_login})
def LienHe(request):
    user_login = request.user
    return render(request, 'other/lienhe.html', {'user_login': user_login})
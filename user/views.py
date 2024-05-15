from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from .forms import UserUpdateForm
from django.db.models import Q
from rent.models import Order, Payment
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.http import JsonResponse
from django.views.decorators.http import require_POST

def profile_user(request):                
    user_login = request.user
    context = {'user_login': user_login}
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, request.FILES, instance=user_login)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.save()
            messages.success(request, "Cập nhật thành công")
            return redirect(reverse('user:profile_user'))
        context['form'] = form
    else:
        form = UserUpdateForm(instance=user_login)
        context['form'] = form
    return render(request, 'user/profile.html', context)


def ds_hoadon(request):                
    user_login = request.user
    ds_order_user = user_login.order_set.all()
    rent_info = request.session.get('rent_infor', {})
    context = {
        'user_login': user_login,
        'ds_order_user': ds_order_user,
    }
    
    return render(request, 'user/ds_hoadon.html', context)

def searchOrder(request):
    user_login = request.user
    print(request.GET)
    query = request.GET.get('search_order')
    if query:
        ds_order_user = Order.objects.filter(
            Q(id__icontains=query) | 
            Q(xe__loai_xe__icontains=query) |
            Q(dia_diem__ten__icontains=query)
        )
    else:
        ds_order_user = Order.objects.none()

    context = {
        'user_login': user_login,
        'ds_order_user': ds_order_user,
    }

    return render(request, 'user/ds_hoadon.html', context)

def ChiTietHoaDon(request, id):
    user_login = request.user
    order = Order.objects.get(id=id)
    context = {
        'user_login': user_login,
        'order': order,
    }
    return render(request, 'user/chitiethoadon.html', context=context)

def change_password(request):
    user_login = request.user
    if request.method == 'POST' and request.user.is_authenticated:
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Đổi mật khẩu thành công!')
            return redirect('rent:logout')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'user/doimk.html', {
        'form': form,
        'user_login': user_login,
    })

@require_POST
def cancel_order(request, id):
    order = Order.objects.get(id=id)
    order.bi_huy = True
    order.save()
    return JsonResponse({'status': 'Order cancelled successfully'})

@require_POST
def thanh_toan_user(request, id):
    order = Order.objects.get(id=id)
    payment = Payment()
    payment.order = order
    payment.save()
    redirect_url = reverse('rent:thanh-toan', args=[id, payment.id])
    return JsonResponse({'redirect_url': redirect_url})
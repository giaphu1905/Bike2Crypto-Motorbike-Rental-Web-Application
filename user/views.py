from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from .forms import UserUpdateForm


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


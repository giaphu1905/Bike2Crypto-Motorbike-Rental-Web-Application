from django import forms
from .models import UserProfile
from django.contrib.auth.forms import UserCreationForm

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['banglai', 'fullname', 'date_of_birth', 'gender', 'phone_number', 'address']

        widgets = {
                'date_of_birth': forms.DateInput(attrs={'type': 'date', 'class': 'form-control', 'placeholder': 'Nhập ngày sinh của bạn'}),
            }
    def __init__(self, *args, **kwargs):
        super(UserUpdateForm, self).__init__(*args, **kwargs)
        self.fields['banglai'].widget.attrs['class'] = 'form-control-file'
        self.fields['fullname'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Họ và tên của bạn'})
        self.fields['date_of_birth'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Nhập ngày sinh của bạn', 'type': 'date'})
        self.fields['gender'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Nhập giới tính của bạn'})
        self.fields['phone_number'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Nhập số điện thoại của bạn'})
        self.fields['address'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Nhập địa chỉ của bạn'})

class UserProfileCreationForm(UserCreationForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = UserProfile
        fields = ('username',)

    def save(self, commit=True):
        user = super(UserProfileCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
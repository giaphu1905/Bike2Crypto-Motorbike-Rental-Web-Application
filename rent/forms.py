from user.models import UserProfile
from django import forms
from django.contrib.auth.forms import UserCreationForm

class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'input100'}))
    password1 = forms.CharField(max_length=50, widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'input100'}))
    password2 = forms.CharField(max_length=50, widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password', 'class': 'input100'}))

    class Meta:
        model = UserProfile
        fields = ('username', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].validators = []    

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username and UserProfile.objects.filter(username=username).exists():
            raise forms.ValidationError('Username này đã được sử dụng!!!')
        return username

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        if UserProfile.objects.filter(username=username).exists():
            raise forms.ValidationError('Username này đã được sử dụng!!!')
        return cleaned_data
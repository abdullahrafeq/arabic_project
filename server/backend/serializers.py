from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote, UserProfile
from django.contrib.auth.models import User
import re


class ScholarYearCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarYearCategory
        fields = '__all__'

class ScholarSerializer(serializers.ModelSerializer):
    year_category = ScholarYearCategorySerializer(read_only=True)
    class Meta:
        model = Scholar
        fields = '__all__'

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    author = ScholarSerializer(read_only=True)
    categories = BookCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 
            'name', 
            'arabic_name', 
            'author', 
            'categories', 
            'image_url', 
            'is_favourite',
            'is_on_home_page'
            ]

class QuoteSerializer(serializers.ModelSerializer):
    author = ScholarSerializer(read_only=True)

    class Meta:
        model = Quote
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    old_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    is_superuser = serializers.SerializerMethodField()

    # remove unique validation with django's default message for username, email, password
    username = serializers.CharField(
        allow_blank = True,
        required = False,
        validators = [], # Disable any validation on username including unique validator
    )
    email = serializers.CharField(
        allow_blank = True,
        required = False,
        validators = [], # Disable any validation on email including valid email validator
    )
    password = serializers.CharField(
        allow_blank = True,
        required = False,
        validators = [], # Disable any validation on password
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_superuser', 'confirm_password', 'old_password', 'new_password']

    def get_is_superuser(self, obj):
        # Access the request from context and check if the user is a superuser
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return request.user.is_superuser
        return False
    
    def validate(self, data):
        action = self.context.get('action')
        if action == 'signup':
            return self.validate_signup(data)
        elif action == 'login':
            return self.validate_login(data)
        elif action == 'update':
            return self.validate_update(data)
        return data
    
    def validate_signup(self, data):
        errors = {}
        # Check for missing fields in incoming data
        if 'username' not in data:
            errors["username"] = "Username is required"

        if 'email' not in data:
            errors["email"] = "Email is required"

        if 'password' not in data:
            errors["password"] = "Password is required"

        if 'confirm_password' not in data:
            errors["confirm_password"] = "Confirm password is required"
        
        # Check if fields are blank and add custom errors
        if not data.get('username', '').strip():
            errors['username'] = 'Username may not be blank.'

        # Manually validate email format using regular expressions
        email = data.get('email', '').strip()
        if not email:
            errors['email'] = 'Email field may not be blank.'
        else:
            # Basic email regex pattern for validation
            email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            if not re.match(email_regex, email):
                errors['email'] = 'Enter a valid email address.'

        if not data.get('password', '').strip():
            errors['password'] = 'Password may not be blank.'

        if not data.get('confirm_password', '').strip():
            errors['confirm_password'] = 'Confirm password may not be blank.'
        
        # Check if passwords match
        if data.get('password') and data.get('confirm_password'):
            if data['password'] != data['confirm_password']:
                errors['confirm_password'] = 'Passwords do not match.'

        # Check for unique username, only if no other username errors
        if 'username' in data and 'username' not in errors:
            if User.objects.filter(username=data['username']).exists():
                errors["username"] = "Username is already taken. Please choose a different username."

        # Check for unique email, only if no other email errors
        if 'email' in data and 'email' not in errors:
            if User.objects.filter(email=data['email']).exists():
                errors["email"] = "Email is already taken. Please choose a different email."

        # Check for matching passwords
        if 'password' in data and 'confirm_password' in data:
            if data['password'] != data['confirm_password']:
                errors["password"] = "Customized password message, don't match"

        if errors:
            raise serializers.ValidationError(errors)
        
        return data
    
    def validate_update(self, data):
        errors = {}
        print(f"in serialise. data: {data}")
        '''
        if 'username' not in data or not data['username'].strip():
            raise serializers.ValidationError({"username": "Username is required"})
        
        if 'email' not in data or not data['email'].strip():
            raise serializers.ValidationError({"email": "Email is required"})

        '''
        
        # Validate old password
        if 'old_password' not in data or not data['old_password'].strip():
            errors["old_password"] = "Old password is required"
        elif not self.instance.check_password(data['old_password']):
            errors["old_password"] = "Old password is incorrect"

        # Validate new password
        if 'new_password' not in data or not data['new_password'].strip():
            errors["new_password"] = "New password is required"
        elif data['old_password'] == data['new_password']:
            errors["new_password"] = "New password must be different from old password"
        
        if errors:
            print(f"errors: {errors}")
            raise serializers.ValidationError(errors)
        
        return data

    def create(self, validated_data):
        # remove confirm_password, old_password and new_password are not popped 
        # since the json sent from frontend when creating a user does not have old_password and new_password fields 
        validated_data.pop('confirm_password') 
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        validated_data.pop('confirm_password', None)
        old_password = validated_data.pop('old_password', None)
        new_password = validated_data.pop('new_password', None)

        instance = super().update(instance, validated_data)

        if old_password and new_password:
            instance.set_password(new_password)
            instance.save()

        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    favourite_books = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), many=True)
    favourite_scholars = serializers.PrimaryKeyRelatedField(queryset=Scholar.objects.all(), many=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'
    
from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import ValidationError

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
    confirm_password = serializers.CharField(write_only=True, required=False)
    old_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    # remove unique validation with django´s default message
    username = serializers.CharField(validators = [])
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'old_password', 'new_password']
        extra_kwargs = {
            'email': {'required': False},
            'username': {'required': False},
            'password': {'required': False}
        }

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
        # Check for empty fields
        if 'username' not in data:
            errors["username"] = "Username is required"
        
        if 'email' not in data:
            errors["email"] = "Email is required"
        
        if 'password' not in data:
            errors["password"] = "Password is required"
        
        if 'confirm_password' not in data:
            errors["confirm_password"] = "Confirm password is required"

        # Check for unique fields
        # Manually validate fields to capture UniqueValidator errors
        if User.objects.filter(username=data['username']).exists():
            errors["username"] = "Username is already taken. Please choose a different username!."
        
        if User.objects.filter(email=data['email']).exists():
            errors["email"] = "Email is already taken. Please choose a different email."
        
        # Check for matching passwords
        if 'password' in data and 'confirm_password' in data:
            if data['password'] != data['confirm_password']:
                errors["password"] = "Passwords do not match"

        if errors:
            raise serializers.ValidationError(errors)
        
        return data
    
    def validate_login(self, data):
        errors = {}
        # Check for not empty fields
        if 'username' not in data:
            errors["username"] = "Username is required"
        
        if 'password' not in data:
            errors["password"] = "Password is required"
        
        # Check if user exists and if password is correct
        user = User.objects.filter(username=data['username']).first()
        if not user or not user.check_password(data['password']):
            errors["password"] = "Invalid username or password"
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return data
    
    def validate_update(self, data):
        # Check for empty fields
        if 'username' not in data or not data['username'].strip():
            raise serializers.ValidationError({"username": "Username is required"})
        
        if 'email' not in data or not data['email'].strip():
            raise serializers.ValidationError({"email": "Email is required"})
        
        if 'password' not in data or not data['old_password'].strip():
            raise serializers.ValidationError({"old_password": "Old is required"})
        
        if not self.instance.check_password(data['old_password']):
            raise serializers.ValidationError({"old_password": "Old password is incorrect"})

        if 'new_password' not in data or not data['new_password'].strip():
            raise serializers.ValidationError({"new_password": "New password is required"})
        
        if data['old_password'] == data['new_password']:
            raise serializers.ValidationError({"new_password": "New password must be different from old password"})

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
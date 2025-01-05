from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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
    author = serializers.PrimaryKeyRelatedField(queryset=Scholar.objects.all())  # Accepts author ID
    categories = serializers.PrimaryKeyRelatedField(queryset=BookCategory.objects.all(), many=True)  # Accepts category IDs

    class Meta:
        model = Book
        fields = '__all__'

class QuoteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Scholar.objects.all())  # Accepts author ID
    class Meta:
        model = Quote
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    favourite_scholars = serializers.PrimaryKeyRelatedField(
        queryset=Scholar.objects.all(), many=True, required=False
    )  # Writable field to accept scholar IDs
    favourite_books = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), many=True, required=False
    )  # Writable field to accept book IDs

    # Add read-only nested serializers for detailed output
    #favourite_scholars_detail = ScholarSerializer(many=True, read_only=True)
    #favourite_books_detail = BookSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields =  [
            'favourite_scholars', 'favourite_books',
        ]

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

    profile = UserProfileSerializer(read_only=True)
    '''
    favourite_scholars = serializers.PrimaryKeyRelatedField(
        source='profile.favourite_scholars',  # Link to UserProfile
        queryset=Scholar.objects.all(),
        many=True,
        required=False
    )
    favourite_books = serializers.PrimaryKeyRelatedField(
        source='profile.favourite_books',  # Link to UserProfile
        queryset=Book.objects.all(),
        many=True,
        required=False
    )
    '''

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 
                  'is_superuser', 'confirm_password', 'old_password', 
                  'new_password', 'profile']

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
            errors['email'] = 'Email may not be blank.'
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
                errors["password"] = "Passwords do not match"

        if errors:
            raise serializers.ValidationError(errors)
        
        return data
    
    def validate_login(self, data):
        errors = {}
        username = data.get('username')
        password = data.get('password')

        # Check for missing fields
        if not username:
            errors['username'] = "Username may not be blank."
        if not password:
            errors['password'] = "Password may not be blank."

        # Stop here if any required fields are missing
        if errors:
            raise serializers.ValidationError(errors)
        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is None:
            errors['username'] = "Invalid username or password."
            errors['password'] = "Invalid username or password."
            raise serializers.ValidationError(errors)

        # Add authenticated user to validated data
        data['user'] = user
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
from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote
from django.contrib.auth.models import User

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

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'old_password', 'new_password']

    def validate(self, data):
        # Check if username exists
        if 'username' in data and User.objects.filter(username=data['username']).exists():
            if not self.instance or self.instance.username != data['username']:
                raise serializers.ValidationError({"username": "Username exists"})
        
        # Check if email exists
        if 'email' in data and User.objects.filter(email=data['email']).exists():
            if not self.instance or self.instance.email != data['email']:
                raise serializers.ValidationError({"email": "Email exists"})

        # Check if passwords match
        if data.get('confirm_password') and data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match")

        # Validate old password and new password logic
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        if old_password and new_password:
            # Check if old password matches the current user's password
            if not self.instance.check_password(old_password):
                raise serializers.ValidationError("Old password is incorrect")

            # Check if old password is the same as new password
            if old_password == new_password:
                raise serializers.ValidationError("New password must be different from old password")

        return data
    
    def create(self, validated_data):
        # remove confirm_password, old_password and new_password are not poped 
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
        validated_data.pop('confirm_password', None)  # Remove confirm_password from validated_data if present
        old_password = validated_data.pop('old_password', None)
        new_password = validated_data.pop('new_password', None)

        instance = super().update(instance, validated_data)

        if old_password and new_password:
            if not instance.check_password(old_password):
                raise serializers.ValidationError("Old password is not correct")

            if old_password == new_password:
                raise serializers.ValidationError("New password must be different from old password")

            instance.set_password(new_password)
            instance.username = validated_data.get('username', instance.username)
            instance.email = validated_data.get('email', instance.email)
            instance.save()

        return instance
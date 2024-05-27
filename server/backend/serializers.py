from rest_framework import serializers
from backend.models import Scholar, BookCategory, Book

class ScholarSerializer(serializers.ModelSerializer):
    image = serializers.ImageField() 
    class Meta:
        model = Scholar
        fields = '__all__'

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    author = ScholarSerializer()
    category = BookCategorySerializer()
    arabic_category = BookCategorySerializer()  # Use BookCategorySerializer for arabic_category
    image = serializers.ImageField() 
    class Meta:
        model = Book
        fields = '__all__'
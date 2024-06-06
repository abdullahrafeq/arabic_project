from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote

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
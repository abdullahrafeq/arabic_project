from rest_framework import serializers
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book

class ScholarYearCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarYearCategory
        fields = '__all__'

class ScholarSerializer(serializers.ModelSerializer):
    year_category = ScholarYearCategorySerializer()
    class Meta:
        model = Scholar
        fields = '__all__'

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    author = ScholarSerializer()
    categories = BookCategorySerializer(many=True)
    image = serializers.ImageField() 
    class Meta:
        model = Book
        fields = '__all__'
from rest_framework import serializers
from backend.models import Scholar
from backend.models import Book

class ScholarSerializer(serializers.ModelSerializer):
    image = serializers.ImageField() 
    class Meta:
        model = Scholar
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    author = ScholarSerializer()
    image = serializers.ImageField() 
    class Meta:
        model = Book
        fields = '__all__'
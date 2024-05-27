from rest_framework import serializers
from backend.models import Scholar
from backend.models import Book

class ScholarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholar
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.name')
    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'image']

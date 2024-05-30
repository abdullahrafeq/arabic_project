from django.http import JsonResponse
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book
from backend.serializers import ScholarYearCategorySerializer, ScholarSerializer, BookCategorySerializer, BookSerializer

def scholar_year_categories(request):
    data = ScholarYearCategory.objects.all()
    serializer = ScholarYearCategorySerializer(data, many=True, context={'request': request})
    return JsonResponse({'scholar_year_categories': serializer.data})

def scholars(request):
    data = Scholar.objects.all()
    serializer = ScholarSerializer(data, many=True, context={'request': request})
    return JsonResponse({'scholars': serializer.data})

def book_categories(request):
    data = BookCategory.objects.all()
    serializer = BookCategorySerializer(data, many=True, context={'request': request})
    return JsonResponse({'book_categories': serializer.data})

def books(request):
    data = Book.objects.all()
    serializer = BookSerializer(data, many=True, context={'request': request})
    return JsonResponse({'books': serializer.data})
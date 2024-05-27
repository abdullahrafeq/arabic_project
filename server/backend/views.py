from django.http import JsonResponse
from backend.serializers import ScholarSerializer
from backend.serializers import BookSerializer
from backend.models import Scholar
from backend.models import Book

def scholars(request):
    #invoke serializer and return to client
    data = Scholar.objects.all()
    serializer = ScholarSerializer(data, many=True)
    return JsonResponse({'scholars': serializer.data})

def books(request):
    data = Book.objects.all()
    serializer = BookSerializer(data, many=True)
    return JsonResponse({'books': serializer.data})

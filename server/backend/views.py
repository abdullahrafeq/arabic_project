from django.http import JsonResponse, Http404
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book
from backend.serializers import ScholarYearCategorySerializer, ScholarSerializer, BookCategorySerializer, BookSerializer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser 

def scholar_year_categories(request):
    data = ScholarYearCategory.objects.all()
    serializer = ScholarYearCategorySerializer(data, many=True, context={'request': request})
    return JsonResponse({'scholar_year_categories': serializer.data})

@api_view(['GET', 'POST'])
def scholars(request):
    if request.method == 'GET':
        data = Scholar.objects.all()
        serializer = ScholarSerializer(data, many=True, context={'request': request})
        return Response({'scholars': serializer.data})
    elif request.method == 'POST':
        serializer = ScholarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'scholars': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def scholar(request, id):
    try:
        scholar = Scholar.objects.get(pk=id)
    except Scholar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ScholarSerializer(scholar, context={'request': request})
        return Response({'scholar': serializer.data})
    elif request.method == 'PUT':
        serializer = ScholarSerializer(scholar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'scholar': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        scholar.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def book_categories(request):
    data = BookCategory.objects.all()
    serializer = BookCategorySerializer(data, many=True, context={'request': request})
    return JsonResponse({'book_categories': serializer.data})

def books(request):
    data = Book.objects.all()
    serializer = BookSerializer(data, many=True, context={'request': request})
    return JsonResponse({'books': serializer.data})

def book(request, id):
    data = Book.objects.get(pk=id)
    serializer = BookSerializer(data, context={'request': request})
    return JsonResponse({'book': serializer.data})
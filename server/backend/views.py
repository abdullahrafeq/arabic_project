from django.http import JsonResponse
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote
from backend.serializers import ScholarYearCategorySerializer, ScholarSerializer, BookCategorySerializer, BookSerializer, QuoteSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import os
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

@api_view(['GET', 'POST'])
def books(request):
    if request.method == 'GET':
        data = Book.objects.all()
        serializer = BookSerializer(data, many=True, context={'request': request})
        return Response({'books': serializer.data})
    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'books': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def book(request, id):
    try:
        book = Book.objects.get(pk=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BookSerializer(book, context={'request': request})
        return Response({'book': serializer.data})
    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'book': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def quotes(request):
    if request.method == 'GET':
        data = Quote.objects.all()
        serializer = QuoteSerializer(data, many=True, context={'request': request})
        return Response({'quotes': serializer.data})
    elif request.method == 'POST':
        serializer = QuoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'quotes': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quote(request, id):
    try:
        quote = Quote.objects.get(pk=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = QuoteSerializer(quote, context={'request': request})
        return Response({'quote': serializer.data})
    elif request.method == 'PUT':
        serializer = QuoteSerializer(quote, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'quote': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        quote.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
from django.http import JsonResponse
from backend.models import ScholarYearCategory, Scholar, BookCategory, Book, Quote
from backend.serializers import ScholarYearCategorySerializer, ScholarSerializer, BookCategorySerializer, BookSerializer, QuoteSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

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
        # Restrict adding scholars to admins only
        if not request.user.is_superuser:
            return Response({'error': 'Permission denied. Only admins can add scholars.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ScholarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = Scholar.objects.all()
            updated_serializer = ScholarSerializer(data, many=True, context={'request': request})
            print("updated_serializer: ", updated_serializer)
            return Response({'scholars': updated_serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def scholar(request, id):
    print("the request is: ", request)
    print("User:", request.user)  # Outputs the user instance
    print("is super user:", request.user.is_superuser)  # Outputs the user instance
    try:
        scholar = Scholar.objects.get(pk=id)
    except Scholar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ScholarSerializer(scholar, context={'request': request})
        return Response({'scholar': serializer.data})
    elif request.method == 'PUT':
        # Restrict editing scholars to admins only
        if not request.user.is_superuser:
            return Response({'error': 'Permission denied. Only admins can edit scholars.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ScholarSerializer(scholar, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'scholar': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
         # Restrict deleting scholars to admins only
        if not request.user.is_superuser:
            return Response({'error': 'Permission denied. Only admins can delete scholars.'}, status=status.HTTP_403_FORBIDDEN)
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
            data = Book.objects.all()
            updated_serializer = BookSerializer(data, many=True, context={'request': request})
            print("updated_serializer: ", updated_serializer)
            return Response({'books': updated_serializer.data})
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
        # Restrict editing books to admins only
        if not request.user.is_superuser:
            return Response({'error': 'Permission denied. Only admins can edit books.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = BookSerializer(book, data=request.data, partial=True)
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
            data = Quote.objects.all()
            updated_serializer = QuoteSerializer(data, many=True, context={'request': request})
            print("updated_serializer: ", updated_serializer)
            return Response({'quotes': updated_serializer.data})
            #return Response({'quotes': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quote(request, id):
    try:
        quote = Quote.objects.get(pk=id)
    except Quote.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = QuoteSerializer(quote, context={'request': request})
        return Response({'quote': serializer.data})
    elif request.method == 'PUT':
        if not request.user.is_superuser:
            return Response({'error': 'Permission denied. Only admins can edit quotes.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = QuoteSerializer(quote, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'quote': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        quote.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data, context={'action': 'signup'})
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        return Response(tokens, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    """
    Handles user login and JWT token generation.
    """
    # Pass the data and context to the UserSerializer for validation
    serializer = UserSerializer(data=request.data, context={'action': 'login'})
    
    if serializer.is_valid():
        # Extract the authenticated user from validated data
        user = serializer.validated_data['user']
        
        # Generate JWT tokens for the user
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
        }, status=status.HTTP_200_OK)
    
    # Return validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

# View to get current user
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def current_user(request):
    try:
        user = request.user
        print(f"Authenticated user: {user.username}")  # Debugging line
        # print(f"Request headers: {request.headers}")  # Debugging line
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSerializer(user, context={'request': request})
        return Response({'user': serializer.data})
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, context={'action': 'update'})
        print(f"request.data: {request.data}")
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# handle the login
# login is handled by jwt


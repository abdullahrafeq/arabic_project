"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/scholar-year-categories/', views.scholar_year_categories, name='scholar_year_categories'),
    path('api/scholars/', views.scholars, name='scholars'),
    path('api/scholars/<int:id>/', views.scholar, name='scholar'),
    path('api/book-categories/', views.book_categories, name='book_categories'),
    path('api/books/', views.books, name='books'),
    path('api/books/<int:id>/', views.book, name='book'),
    path('api/quotes/', views.quotes, name='quotes'),
    path('api/quotes/<int:id>/', views.quote, name='quote'),
    path('api/register/', views.register, name='register'),
    path('api/logout/', views.logout, name='logout'),
    path('api/login/', views.login, name='login'),
    path('api/reviews/', views.reviews, name='reviews'),
    path('api/reviews/<int:id>/', views.review, name='reviews'),
    path('api/all-users/', views.all_users, name='all_users'),
    path('api/current-user/', views.current_user, name='current_user'),
    path('api/user-profile/', views.user_profile, name='user_profile'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
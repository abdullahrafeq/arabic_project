from django.db import models
from .utils import convert_to_arabic_numerals
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class ScholarYearCategory(models.Model):
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    name = models.CharField(max_length=200, null=True, blank=True)
    arabic_name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name or f"{self.start_year} - {self.end_year}"
    
    def save(self, *args, **kwargs):
        self.name = f"{self.start_year} - {self.end_year}"
        self.arabic_name = f"{convert_to_arabic_numerals(self.start_year)} - {convert_to_arabic_numerals(self.end_year)}"
        super(ScholarYearCategory, self).save(*args, **kwargs)

class BookCategory(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name

class Scholar(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    arabic_birth_year = models.CharField(max_length=200, blank=True, null=True)
    arabic_death_year = models.CharField(max_length=200, blank=True, null=True)
    year_category = models.ForeignKey(ScholarYearCategory, on_delete=models.CASCADE, related_name="scholars", blank=True, null=True)
    arabic_year_category = models.CharField(max_length=200, blank=True, null=True)
    is_on_home_page = models.BooleanField(default=False)
    specialized_sciences = models.ManyToManyField(BookCategory, related_name='scholars', blank=True)
    description = models.CharField(max_length=1000, default="", blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.arabic_birth_year = convert_to_arabic_numerals(self.birth_year)
        self.arabic_death_year = convert_to_arabic_numerals(self.death_year)

        if self.birth_year is not None:
            year_category = ScholarYearCategory.objects.filter(
                start_year__lte=self.birth_year, 
                end_year__gte=self.birth_year
                ).first()
            if year_category:
                self.year_category = year_category
                self.arabic_year_category = year_category.arabic_name

        super(Scholar, self).save(*args, **kwargs)


class Book(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    author = models.ForeignKey(Scholar, on_delete=models.CASCADE, related_name='books')
    categories = models.ManyToManyField(BookCategory, related_name='books', blank=True)
    is_on_home_page = models.BooleanField(default=False, blank=True, null=True)
    description = models.CharField(max_length=1000, default="", blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        super(Book, self).save(*args, **kwargs)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    review = models.CharField(max_length=1000, default="", blank=True, null=True)

class Quote(models.Model):
    quote = models.CharField(max_length=200)
    arabic_quote = models.CharField(max_length=200)
    author = models.ForeignKey(Scholar, on_delete=models.CASCADE, related_name='quotes')
    is_on_home_page = models.BooleanField(default=False)

    def __str__(self):
        return f'Quote(id={self.id}, author={self.author.name}, quote="{self.quote}")'
    

# Fix custom user model to store the favourite scholar in the user
# so that when a user logs out the favourite scholars is not stored in the page itself rather in the user model 
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    favourite_scholars = models.ManyToManyField('Scholar', related_name='favourited_by', blank=True)
    favourite_books = models.ManyToManyField('Book', related_name='favourited_by', blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  # For new users
        UserProfile.objects.create(user=instance)
    else:  # For existing users without a profile
        if not hasattr(instance, 'profile'):  # Check if the user already has a profile
            UserProfile.objects.create(user=instance)
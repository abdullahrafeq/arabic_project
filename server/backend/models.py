from django.db import models
from .utils import convert_to_arabic_numerals  # Adjust the import as needed

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

class Scholar(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    arabic_birth_year = models.CharField(max_length=200, null=True)
    arabic_death_year = models.CharField(max_length=200, null=True)
    year_category = models.ForeignKey(ScholarYearCategory, on_delete=models.CASCADE, related_name="scholars", blank=True, null=True)
    arabic_year_category = models.CharField(max_length=200, null=True)
    is_favourite = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.arabic_birth_year = convert_to_arabic_numerals(self.birth_year)
        self.arabic_death_year = convert_to_arabic_numerals(self.death_year)
        super(Scholar, self).save(*args, **kwargs)

        if self.birth_year is not None:
            year_category = ScholarYearCategory.objects.filter(start_year__lte=self.birth_year, end_year__gte=self.birth_year).first()
            if year_category:
                self.year_category = year_category

        super(Scholar, self).save(*args, **kwargs)

class BookCategory(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    author = models.ForeignKey(Scholar, on_delete=models.CASCADE, related_name='books')
    categories = models.ManyToManyField(BookCategory, related_name='books', blank=True)
    image = models.ImageField(upload_to='book_images/', blank=True, null=True)
    is_favourite = models.BooleanField(default=False)

    def __str__(self):
        return self.name
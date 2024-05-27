from django.db import models

class Scholar(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    arabic_birth_year = models.IntegerField(default=0)
    arabic_death_year = models.IntegerField(default=0)
    image = models.ImageField(upload_to='scholar_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name

class BookCategory(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=200)
    arabic_name = models.CharField(max_length=200, default="")
    author = models.ForeignKey(Scholar, on_delete=models.CASCADE, related_name='books')
    category = models.ForeignKey(BookCategory, on_delete=models.CASCADE, related_name='books', blank=True, null=True)
    arabic_category = models.ForeignKey(BookCategory, on_delete=models.CASCADE, related_name='arabic_books', blank=True, null=True)
    image = models.ImageField(upload_to='book_images/', blank=True, null=True)

    def __str__(self):
        return self.name
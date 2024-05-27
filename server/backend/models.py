from django.db import models

class Scholar(models.Model):
    name = models.CharField(max_length=200)
    birth_year = models.IntegerField()
    death_year = models.IntegerField()
    image = models.ImageField(upload_to='scholar_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=200)
    author = models.ForeignKey(Scholar, on_delete=models.CASCADE, related_name='books')
    image = models.ImageField(upload_to='book_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name
from django.db import models

class Scholar(models.Model):
    name = models.CharField(max_length=200)
    birth_year = models.IntegerField(max_length=10)
    death_year = models.IntegerField(max_length=10)
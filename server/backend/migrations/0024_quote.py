# Generated by Django 5.0.4 on 2024-06-05 17:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0023_book_is_on_home_page_scholar_is_on_home_page'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quote', models.CharField(max_length=200)),
                ('arabic_quote', models.CharField(max_length=200)),
                ('is_on_home_page', models.BooleanField(default=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quotes', to='backend.scholar')),
            ],
        ),
    ]

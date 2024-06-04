# Generated by Django 5.0.4 on 2024-06-02 11:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_alter_scholaryearcategory_arabic_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavouriteScholar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favourite_scholar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favourite_scholars', to='backend.scholar')),
            ],
        ),
    ]

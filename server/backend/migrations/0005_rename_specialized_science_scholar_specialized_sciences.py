# Generated by Django 5.0.4 on 2025-01-04 13:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_book_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='scholar',
            old_name='specialized_science',
            new_name='specialized_sciences',
        ),
    ]

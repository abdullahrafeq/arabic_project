from django import forms
from django.contrib import admin
from backend.models import Scholar, BookCategory, Book


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(BookForm, self).__init__(*args, **kwargs)
        self.fields['arabic_category'].queryset = BookCategory.objects.all()
        self.fields['arabic_category'].label_from_instance = lambda obj: "%s" % obj.arabic_name

class BookAdmin(admin.ModelAdmin):
    form = BookForm

admin.site.register(Scholar)
admin.site.register(BookCategory)
admin.site.register(Book, BookAdmin)

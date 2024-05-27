from rest_framework import serializers
from backend.models import Scholar

class ScholarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholar
        fields = '__all__'
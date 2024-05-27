from backend.models import Scholar
from django.http import JsonResponse
from backend.serializers import ScholarSerializer

def scholars(request):
    #invoke serializer and return to client
    data = Scholar.objects.all()
    serializer = ScholarSerializer(data, many=True)
    return JsonResponse({'scholars': serializer.data})
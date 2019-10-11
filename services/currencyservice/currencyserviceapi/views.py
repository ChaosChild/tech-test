from django.http import HttpResponse, JsonResponse
import requests

def rates(request):
    response = requests.get('https://api.exchangeratesapi.io/latest?base=ZAR')
    return HttpResponse(response, content_type='application/json')

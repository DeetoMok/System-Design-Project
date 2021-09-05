from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import CurrentAED

class Another(View):
    # CurrentAED.objects.filter() will return a list
    # CurrentAED.objects.get() will return only one record
    currentaed = CurrentAED.objects.all()
    output = ""
    for aed in currentaed:
        output += f"We have {aed.lat} latitude, {aed.lon} longtitude aed in database<br>"

    def get(self, request):
        return HttpResponse(self.output)


def first(request):
    return HttpResponse("First message from views")

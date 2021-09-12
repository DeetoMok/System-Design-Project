from rest_framework import serializers
from .models import CurrentAED

class AedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentAED
        fields = ['id', 'lat', 'lon', 'pa', ]
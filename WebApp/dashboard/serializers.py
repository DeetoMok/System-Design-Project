from rest_framework.serializers import ModelSerializer
from .models import CurrentAED

class AedSerializer(ModelSerializer):
    class Meta:
        model = CurrentAED
        # fields = ['id', 'lat', 'lon', 'pa', ]
        fields = '__all__'
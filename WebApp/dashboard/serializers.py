from rest_framework.serializers import ModelSerializer
from .models import CurrentAED, Ohca, Integer, String

class AedSerializer(ModelSerializer):
    class Meta:
        model = CurrentAED
        # fields = ['id', 'lat', 'lon', 'pa', ]
        fields = '__all__'

class OhcaSerializer(ModelSerializer):
    class Meta:
        model = Ohca
        fields = '__all__'

# class IntegerSerializer(ModelSerializer):
#     class Meta:
#         model = Integer
#         fields = '__all__'

# class StringSerializer(ModelSerializer):
#     class Meta:
#         model = String
#         fields = '__all__'
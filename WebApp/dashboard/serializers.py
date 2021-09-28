from rest_framework.serializers import ModelSerializer
from .models import CurrentAED, Ohca, AedCandidate

class AedSerializer(ModelSerializer):
    class Meta:
        model = CurrentAED
        # fields = ['id', 'lat', 'lon', 'pa', ]
        fields = '__all__'

class OhcaSerializer(ModelSerializer):
    class Meta:
        model = Ohca
        fields = '__all__'

class AedcandidateSerializer(ModelSerializer):
    class Meta:
        model = AedCandidate
        fields = '__all__'
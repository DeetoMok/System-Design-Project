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

class AedcandidatesSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(AedcandidatesSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = AedCandidate
        fields = '__all__'
    # def create(self, validated_data):
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     return super().update(instance, validated_data)
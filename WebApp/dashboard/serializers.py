from rest_framework.serializers import ModelSerializer
from .models import CurrentAED, Ohca, AedCandidate, CurrentAED

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

class AedsSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(AedsSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = CurrentAED
        fields = '__all__'

class OhcasSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(OhcasSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = Ohca
        fields = '__all__'

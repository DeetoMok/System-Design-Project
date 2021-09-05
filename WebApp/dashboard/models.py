from django.db import models

# Create your models here.
class CurrentAED(models.Model):
    PAS = [(i,str(i)) for i in range(1,56)]
    REGIONS = (("N",'North'),("S",'South'),("E",'East'),("W",'West'))
    lat = models.FloatField()
    lon = models.FloatField()
    country = models.CharField(max_length=200, default="singapore")
    pa = models.IntegerField(blank=True, null=True, choices=PAS)
    region = models.CharField(max_length=200, blank=True, null=True, choices=REGIONS)
    subzone = models.CharField(max_length=200, blank=True, null=True)

class currentAEDFile(models.Model):
    data = models.FileField(upload_to='', blank=True)
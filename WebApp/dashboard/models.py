
from django.db import models

# Create your models here.
class CurrentAED(models.Model):
    PAS = [(i,str(i)) for i in range(1,56)]
    REGIONS = (("N",'North'),("S",'South'),("E",'East'),("W",'West'))
    SUBZONES = [(i,str(i)) for i in range(1,332)]
    lat = models.FloatField()
    lon = models.FloatField()
    country = models.CharField(max_length=200, default="singapore")
    pa = models.IntegerField(blank=True, null=True, choices=PAS)
    region = models.CharField(max_length=200, blank=True, null=True, choices=REGIONS)
    subzone = models.IntegerField(blank=True, null=True, choices=SUBZONES)

    # ohca = models.OneToOneField(OHCA, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.lat, self.lon

class currentAEDFile(models.Model):
    data = models.FileField(upload_to='', blank=True)

class Ohca(models.Model):
    PAS = [(i,str(i)) for i in range(1,56)]
    REGIONS = (("N",'North'),("S",'South'),("E",'East'),("W",'West'))
    SUBZONES = [(i,str(i)) for i in range(1,332)]
    lat = models.FloatField()
    lon = models.FloatField()
    country = models.CharField(max_length=200, default="singapore")
    pa = models.IntegerField(blank=True, null=True, choices=PAS)
    region = models.CharField(max_length=200, blank=True, null=True, choices=REGIONS)
    subzone = models.IntegerField(blank=True, null=True, choices=SUBZONES)

class Integer(models.Model):
    integer = models.IntegerField(blank=True, null=True)

class String(models.Model):
    string = models.CharField(max_length=200, blank=True, null=True)

# class OHCA(models.Model):
#     lat = models.FloatField()
#     lon = models.FloatField()



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

class AedCandidate(models.Model):
    PAS = [(i,str(i)) for i in range(1,56)]
    REGIONS = (("N",'North'),("S",'South'),("E",'East'),("W",'West'))
    SUBZONES = [(i,str(i)) for i in range(1,332)]
    lat = models.FloatField()
    lon = models.FloatField()
    country = models.CharField(max_length=200, default="singapore")
    pa = models.IntegerField(blank=True, null=True, choices=PAS)
    region = models.CharField(max_length=200, blank=True, null=True, choices=REGIONS)
    subzone = models.IntegerField(blank=True, null=True, choices=SUBZONES)

    def __str__(self):
        return self.lat, self.lon

class currentAEDFile(models.Model):
    data = models.FileField(upload_to='', blank=True)

class Ohca(models.Model):
    PAS = [(i,str(i)) for i in range(1,56)]
    REGIONS = (("N",'North'),("S",'South'),("E",'East'),("W",'West'))
    lat = models.FloatField()
    lon = models.FloatField()
    postalCode = models.IntegerField(blank=True, null=True)
    country = models.CharField(max_length=200, default="singapore")
    pa = models.IntegerField(blank=True, null=True, choices=PAS)
    region = models.CharField(max_length=200, blank=True, null=True, choices=REGIONS)
    subzone = models.CharField(max_length=200, blank=True, null=True)
    covered = models.BooleanField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=200, blank=True, null=True)
    race = models.CharField(max_length=200, blank=True, null=True)
#age, gender, race, year,

class OhcaHeatMap(models.Model):
    jsonData = models.JSONField(default=list, encoder=None, decoder=None)

# class OHCA(models.Model):
#     lat = models.FloatField()
#     lon = models.FloatField()


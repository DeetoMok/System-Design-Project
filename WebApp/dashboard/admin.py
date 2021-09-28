from django.contrib import admin
from .models import CurrentAED, currentAEDFile, Ohca, AedCandidate


# admin.site.register(CurrentAED)
admin.site.register(currentAEDFile)
admin.site.register(Ohca)
admin.site.register(AedCandidate)

@admin.register(CurrentAED)
class CurrentAedAdmin(admin.ModelAdmin):
    list_display = ["lat", "lon", 'region', 'subzone', 'pa']
    list_filter = ["region", "subzone", "pa"]
    search_fields = ["lat", "lon"]
from django.contrib import admin
from .models import CurrentAED, currentAEDFile


# admin.site.register(CurrentAED)
admin.site.register(currentAEDFile)

@admin.register(CurrentAED)
class CurrentAedAdmin(admin.ModelAdmin):
    list_display = ["lat", "lon", 'region', 'subzone', 'pa']
    list_filter = ["region", "subzone", "pa"]
    search_fields = ["lat", "lon"]
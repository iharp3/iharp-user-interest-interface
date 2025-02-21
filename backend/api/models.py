from django.db import models

class Query(models.Model):
    TEMPORAL_CHOICES = [
        ("hour", "hour"),
        ("day", "day"),
        ("month", "month"),
        ("year", "year"),
    ]

    AGG_CHOICES = [
        ("min", "min"),
        ("max", "max"),
        ("mean", "mean"),
        ("none", "none"),
    ]

    VARIABLE_CHOICES = [
        ("2m_temperature", "2m_temperature"),
        ("surface_pressure", "surface_pressure"),
        ("sea_surface_temperature", "sea_surface_temperature"),
        ("total_precipitation", "total_precipitation"),
    ]

    created_at = models.DateTimeField(auto_now_add=True)
    variable = models.CharField(max_length=50, choices=VARIABLE_CHOICES)
    startDateTime = models.DateTimeField()
    endDateTime = models.DateTimeField()
    max_lat = models.DecimalField(max_digits=25, decimal_places=20)
    min_lat = models.DecimalField(max_digits=25, decimal_places=20)
    max_lon = models.DecimalField(max_digits=25, decimal_places=20)
    min_lon = models.DecimalField(max_digits=25, decimal_places=20)
    temporalResolution = models.CharField(max_length=10, choices=TEMPORAL_CHOICES)
    spatialResolution = models.DecimalField(max_digits=3, decimal_places=2)

    # temporalAggregation = models.CharField(max_length=10, choices=AGG_CHOICES)
    # spatialAggregation = models.CharField(max_length=10, choices=AGG_CHOICES)

    def __str__(self):
        return self.title

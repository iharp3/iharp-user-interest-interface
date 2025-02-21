from django.urls import path
from .views import *

urlpatterns = [
    path("query/", query, name="query"),
]   
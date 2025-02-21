import logging
import os
import csv

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import QuerySerializer
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_naive

logger = logging.getLogger(__name__)
MSG_FORMAT = "[%(asctime)s %(name)s-%(levelname)s]: %(message)s"
LOG_DATE_FORMAT = "%d/%b/%Y %H:%M:%S"
logging.basicConfig(level=logging.INFO, format=MSG_FORMAT, datefmt=LOG_DATE_FORMAT)

CSV_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "uiiqueries.csv")

def format_datetime_string(dt_input):
    """
    Convert input datetime
    from 2023-01-01T00:00:00.000Z
    to 2023-01-01 00:00:00
    """
    dt = parse_datetime(dt_input)
    if dt and dt.tzinfo is not None:
        dt = make_naive(dt)
    dt_formatted = dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None
    return dt_formatted

@api_view(["POST"])
def query(request):
  logger.info("Query Request")
  logger.info(request.data)
  serializer = QuerySerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    variable = request.data.get("variable")
    variable = variable.lower().replace(" ", "_")
    start_datetime = request.data.get("startDateTime")
    end_datetime = request.data.get("endDateTime")
    time_resolution = request.data.get("temporalResolution")
    max_lat = round(float(request.data.get("max_lat")), 3)
    min_lat = round(float(request.data.get("min_lat")), 3)
    max_lon = round(float(request.data.get("max_lon")), 3)
    min_lon = round(float(request.data.get("min_lon")), 3)
    spatial_resolution = float(request.data.get("spatialResolution"))

    formatted_start = format_datetime_string(start_datetime)
    formatted_end = format_datetime_string(end_datetime)

    data = [max_lat, min_lat, max_lon, min_lon, variable, formatted_start, formatted_end, spatial_resolution, time_resolution]

    with open(CSV_FILE_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)

    return Response(status=201)
  
  print("Serializer errors:", serializer.errors)
  return Response(serializer.errors, status=400)
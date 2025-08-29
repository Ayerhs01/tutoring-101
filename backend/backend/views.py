from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("id")
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]  # please tighten to IsAuthenticated w/ JWT later

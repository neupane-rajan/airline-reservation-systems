from rest_framework import viewsets, permissions, filters
from .models import Flight
from .serializers import FlightSerializer
from users.permissions import IsAdminUser

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['source', 'destination', 'departure_date', 'flight_number']
    
    def get_permissions(self):
        """
        Admin users can perform all operations.
        Non-admin users can only list and retrieve flights.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
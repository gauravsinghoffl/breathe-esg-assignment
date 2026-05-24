from django.urls import path

from .views import upload_sap
from .views import upload_utility
from .views import upload_travel
from .views import activities
from .views import approve_activity
from .views import reject_activity


urlpatterns = [

    path('upload/sap/', upload_sap),

    path('upload/utility/', upload_utility),

    path('upload/travel/', upload_travel),

    path('activities/', activities),

    path(
        'activities/<int:pk>/approve/',
        approve_activity
    ),

    path(
        'activities/<int:pk>/reject/',
        reject_activity
    ),
]
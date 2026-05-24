import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import RawUpload
from .models import NormalizedActivity
from .models import AuditLog

from .serializers import NormalizedActivitySerializer


@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    RawUpload.objects.create(
        source_type='sap',
        uploaded_file=file
    )

    file.seek(0)
    df = pd.read_csv(file)

    for _, row in df.iterrows():

        suspicious = False

        if row['FuelQty'] < 0:
            suspicious = True

        NormalizedActivity.objects.create(
            source_type='sap',
            category='fuel',
            quantity=row['FuelQty'],
            unit=row['Unit'],
            activity_date=row['Date'],
            suspicious=suspicious,
            original_data=row.to_dict()
        )

    return Response({
        'message': 'SAP upload complete'
    })


@api_view(['POST'])
def upload_utility(request):

    file = request.FILES['file']

    RawUpload.objects.create(
        source_type='utility',
        uploaded_file=file
    )

    file.seek(0)
    df = pd.read_csv(file)

    for _, row in df.iterrows():

        suspicious = False

        if row['kWh'] > 100000:
            suspicious = True

        NormalizedActivity.objects.create(
            source_type='utility',
            category='electricity',
            quantity=row['kWh'],
            unit='kWh',
            activity_date=row['BillingEnd'],
            suspicious=suspicious,
            original_data=row.to_dict()
        )

    return Response({
        'message': 'Utility upload complete'
    })


@api_view(['POST'])
def upload_travel(request):

    file = request.FILES['file']

    RawUpload.objects.create(
        source_type='travel',
        uploaded_file=file
    )

    file.seek(0)
    df = pd.read_csv(file)

    for _, row in df.iterrows():

        suspicious = False

        if pd.isna(row['FromAirport']):
            suspicious = True

        NormalizedActivity.objects.create(
            source_type='travel',
            category='business_travel',
            quantity=1,
            unit='trip',
            activity_date=row['TravelDate'],
            suspicious=suspicious,
            original_data=row.to_dict()
        )

    return Response({
        'message': 'Travel upload complete'
    })


@api_view(['GET'])
def activities(request):

    queryset = NormalizedActivity.objects.all().order_by('-created_at')

    serializer = NormalizedActivitySerializer(
        queryset,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def approve_activity(request, pk):

    activity = NormalizedActivity.objects.get(id=pk)

    old_status = activity.status

    activity.status = 'approved'

    activity.save()

    AuditLog.objects.create(
        activity=activity,
        action='approve',
        old_value=old_status,
        new_value='approved'
    )

    return Response({
        'message': 'approved'
    })


@api_view(['POST'])
def reject_activity(request, pk):

    activity = NormalizedActivity.objects.get(id=pk)

    old_status = activity.status

    activity.status = 'rejected'

    activity.save()

    AuditLog.objects.create(
        activity=activity,
        action='reject',
        old_value=old_status,
        new_value='rejected'
    )

    return Response({
        'message': 'rejected'
    })
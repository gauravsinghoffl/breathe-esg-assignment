from rest_framework import serializers

from .models import NormalizedActivity


class NormalizedActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = NormalizedActivity
        fields = '__all__'
from rest_framework import serializers
from core.models import Entrada


class EntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'

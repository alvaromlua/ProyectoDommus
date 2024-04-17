from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from passlib.handlers.django import django_pbkdf2_sha256
from django.contrib.auth.hashers import make_password, check_password
from core.models import Usuario
from core.serializers import UsuarioSerializer
from core.tokens import account_activation_token


@api_view(['POST'])
def login(request):
    try:
        usuario = Usuario.objects.get(correo=request.data['usuario'])

        # if not django_pbkdf2_sha256.verify(request.data['contrasenia'], str(usuario.contrasenia)):
        # if not check_password(request.data['contrasenia'], usuario.contrasenia):
        if not request.data['contrasenia'] == usuario.contrasenia:
            return Response({'message': 'Contraseña o correo invalidos'}, status=status.HTTP_400_BAD_REQUEST)

        if not usuario.activo:
            return Response({'message': 'Active la cuenta'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return Response({'message': 'No existe un usuario con dicho correo'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def sendEmail(request, pk):
    usuario = Usuario.objects.get(pk=pk)
    mail_subject = "Activate your user account."
    message = render_to_string("template_activate_account.html", {
        'usuario': usuario.nombre,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(usuario.idUsuario)),
        'token': account_activation_token.make_token(usuario),
        "protocol": 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[usuario.correo])
    if email.send():
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        usuario = Usuario.objects.get(pk=uid)
    except:
        usuario = None
        return Response(status=status.HTTP_404_NOT_FOUND)

    if usuario is not None and account_activation_token.check_token(usuario, token):
        usuario.activo = True
        usuario.save()

    return Response(status=status.HTTP_204_NO_CONTENT)

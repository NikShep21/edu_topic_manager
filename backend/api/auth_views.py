from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")
        remember = request.data.get("remember_me", False)

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({
            "success": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role,
            }
        })

        access_age = 60 * 30

        if remember:
            refresh_age = 60 * 60 * 24 * 30
        else:
            refresh_age = 60 * 60 * 24

        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            samesite="Lax",
            max_age=access_age,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            samesite="Lax",
            max_age=refresh_age,
        )

        return response
    

class RefreshView(APIView):

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token"}, status=401)

        token = RefreshToken(refresh_token)

        access = token.access_token

        response = Response({"success": True})

        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            samesite="Lax",
            max_age=60 * 30,
        )

        return response
    

class LogoutView(APIView):

    def post(self, request):

        response = Response({"success": True})

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
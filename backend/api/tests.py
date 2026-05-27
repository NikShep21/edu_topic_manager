from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

User = get_user_model()


class AuthApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            username="student",
            password="password",
            role=User.Role.STUDENT,
            first_name="Ivan",
            last_name="Ivanov",
            middle_name="Ivanovich",
        )

    def test_login_with_valid_credentials_returns_success(self):
        response = self.client.post(
            "/api/auth/login/",
            {
                "username": "student",
                "password": "password",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)

    def test_login_with_invalid_credentials_returns_error(self):
        response = self.client.post(
            "/api/auth/login/",
            {
                "username": "student",
                "password": "wrong-password",
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

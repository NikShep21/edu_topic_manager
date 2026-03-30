import { http, HttpResponse } from "msw";

type LoginRequest = {
  username: string;
  password: string;
};

const mockUser = {
  id: 1,
  username: "admin",
  first_name: "Admin",
  last_name: "User",
  role: "admin",
};

const ACCESS_TOKEN = "mock-access-token";

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (body.username === "admin" && body.password === "123456") {
      return HttpResponse.json({
        access: ACCESS_TOKEN,
        user: mockUser,
      });
    }

    return HttpResponse.json(
      {
        detail: "Неверный логин или пароль",
      },
      {
        status: 500,
      },
    );
  }),

  http.get("/api/users/me", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (authHeader !== `Bearer ${ACCESS_TOKEN}`) {
      return HttpResponse.json(
        {
          detail: "Не авторизован",
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(mockUser);
  }),
];

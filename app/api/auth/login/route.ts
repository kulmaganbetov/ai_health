import { NextResponse } from "next/server";

const CREDENTIALS = {
  username: "aibek",
  password: "health2024",
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (
      username === CREDENTIALS.username &&
      password === CREDENTIALS.password
    ) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("auth-token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Логин немесе пароль қате" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Қате сұраным" }, { status: 400 });
  }
}

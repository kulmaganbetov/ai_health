import { NextResponse } from "next/server";
import { findByUsername, verifyPassword } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Логин мен парольді енгізіңіз" }, { status: 400 });
    }

    const user = findByUsername(username);
    if (!user) {
      return NextResponse.json({ error: "Логин немесе пароль қате" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Логин немесе пароль қате" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, displayName: user.displayName });
    response.cookies.set("auth-token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    response.cookies.set("auth-user", user.displayName, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Сервер қатесі" }, { status: 500 });
  }
}

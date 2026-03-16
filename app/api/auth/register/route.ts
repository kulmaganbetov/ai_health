import { NextResponse } from "next/server";
import { usernameExists, createUser } from "@/lib/users";

const USERNAME_RE = /^[a-z0-9_]{3,20}$/i;

export async function POST(request: Request) {
  try {
    const { username, displayName, password } = await request.json();

    if (!username || !displayName || !password) {
      return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 });
    }
    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        { error: "Логин 3–20 символ, тек латын әріптері, цифрлар немесе _ болуы керек" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль кемінде 6 символ болуы керек" }, { status: 400 });
    }
    if (await usernameExists(username)) {
      return NextResponse.json({ error: "Бұл логин бос емес, басқасын таңдаңыз" }, { status: 409 });
    }

    const user = await createUser(username, displayName, password);

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
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Сервер қатесі. Қайталап көріңіз." }, { status: 500 });
  }
}

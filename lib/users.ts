import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const USERS_PATH = path.join(process.cwd(), "data", "users.json");

export interface User {
  id: string;
  username: string;
  displayName: string;
  passwordHash: string;
  createdAt: string;
}

export function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(USERS_PATH, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  const dir = path.dirname(USERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export function findByUsername(username: string): User | undefined {
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createUser(
  username: string,
  displayName: string,
  password: string
): Promise<User> {
  const users = readUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    username: username.toLowerCase().trim(),
    displayName: displayName.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function usernameExists(username: string): boolean {
  return readUsers().some((u) => u.username.toLowerCase() === username.toLowerCase());
}

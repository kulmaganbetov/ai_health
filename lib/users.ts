import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export interface User {
  id: string;
  username: string;
  displayName: string;
  passwordHash: string;
  createdAt: string;
}

// ─── Storage adapter ────────────────────────────────────────────────────────
// On Vercel: uses KV (Redis). Locally: falls back to data/users.json.

const isVercel = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const KV_KEY = "healthai:users";
const LOCAL_PATH = path.join(process.cwd(), "data", "users.json");

interface SeedUser {
  id: string;
  username: string;
  displayName: string;
  password: string;
  createdAt: string;
}

const INITIAL_USERS: SeedUser[] = [
  { id: "usr_aibek_default", username: "aibek", displayName: "Айбек Сейіт", password: "health2024", createdAt: "2025-01-01T00:00:00.000Z" },
];

// ─── KV helpers ─────────────────────────────────────────────────────────────

async function kvRead(): Promise<User[]> {
  const { kv } = await import("@vercel/kv");
  const users = await kv.get<User[]>(KV_KEY);
  if (!users) {
    // Seed on first access
    const seeded: User[] = await Promise.all(
      INITIAL_USERS.map(async ({ password, ...rest }) => ({
        ...rest,
        passwordHash: await bcrypt.hash(password, 10),
      }))
    );
    await kv.set(KV_KEY, seeded);
    return seeded;
  }
  return users;
}

async function kvWrite(users: User[]): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, users);
}

// ─── File helpers (local dev) ────────────────────────────────────────────────

function fileRead(): User[] {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function fileWrite(users: User[]): void {
  const dir = path.dirname(LOCAL_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(users, null, 2));
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function readUsers(): Promise<User[]> {
  return isVercel ? kvRead() : fileRead();
}

export async function writeUsers(users: User[]): Promise<void> {
  if (isVercel) await kvWrite(users);
  else fileWrite(users);
}

export async function findByUsername(username: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createUser(username: string, displayName: string, password: string): Promise<User> {
  const users = await readUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    username: username.toLowerCase().trim(),
    displayName: displayName.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  await writeUsers([...users, user]);
  return user;
}

export async function usernameExists(username: string): Promise<boolean> {
  const users = await readUsers();
  return users.some((u) => u.username.toLowerCase() === username.toLowerCase());
}

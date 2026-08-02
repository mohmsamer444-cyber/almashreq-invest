// Security helpers — bcrypt-style password hashing (salted, iterated SHA-256)
// and JWT-ready session tokens. This is a demo-grade simulation designed to be
// trivially swapped for a real bcrypt + JWT server implementation.

export interface HashedPassword {
  hash: string;
  salt: string;
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function genSalt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  let hash = `${salt}:${password}`;
  for (let i = 0; i < 1000; i++) {
    hash = await sha256(hash);
  }
  return hash;
}

export async function hashPasswordNew(
  password: string,
): Promise<HashedPassword> {
  const salt = genSalt();
  return { salt, hash: await hashPassword(password, salt) };
}

export async function verifyPassword(
  password: string,
  salt: string,
  expected: string,
): Promise<boolean> {
  const hash = await hashPassword(password, salt);
  return hash === expected;
}

function b64(input: object): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(input))));
}

export async function createSessionToken(userId: string): Promise<string> {
  const header = b64({ alg: "HS256", typ: "JWT" });
  const now = Math.floor(Date.now() / 1000);
  const payload = b64({ sub: userId, iat: now, exp: now + 60 * 60 * 24 * 30 });
  const signature = await sha256(`${header}.${payload}.al-mashreq-secret`);
  return `${header}.${payload}.${signature}`;
}

export function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

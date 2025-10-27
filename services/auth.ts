import { sleep } from "../utils/sleep";

export async function login(email: string): Promise<{ userId: string }> {
  await sleep(400);
  const slug = email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return { userId: `user-${slug || "anon"}` };
}

export async function continueAsGuest(): Promise<void> {
  await sleep(200);
}

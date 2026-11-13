const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Server-side Turnstile check. Only called when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(
  secret: string,
  token: string | undefined,
  ip: string,
) {
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data: unknown = await res.json();
    return (
      typeof data === "object" &&
      data !== null &&
      "success" in data &&
      data.success === true
    );
  } catch {
    return false;
  }
}

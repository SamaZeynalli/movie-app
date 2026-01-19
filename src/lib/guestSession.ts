import { createGuestSession } from "../api/tmdb";

const SESSION_KEY = "tmdb_guest_session";

export async function getGuestSessionId(): Promise<string> {
  const stored = localStorage.getItem(SESSION_KEY);

  if (stored) {
    const parsed = JSON.parse(stored);

    if (new Date(parsed.expires_at) > new Date()) {
      return parsed.guest_session_id;
    }
  }

  const session = await createGuestSession();

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      guest_session_id: session.guest_session_id,
      expires_at: session.expires_at,
    })
  );

  return session.guest_session_id;
}
import { createAuthClient } from "better-auth/client";
import { jwtClient } from "better-auth/client/plugins";

const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WINGBIRD_API_URL || undefined,
  plugins: [jwtClient()],
});

export const authClient = {
  async loginWithGoogle(callbackURL?: string) {
    const origin = window.location.origin;
    await auth.signIn.social({
      provider: "google",
      callbackURL: callbackURL
        ? `${origin}/auth/success?callbackUrl=${encodeURIComponent(callbackURL)}`
        : `${origin}/auth/success`,
    });
  },
  async getSessionToken() {
    const { data, error } = await auth.getSession();
    if (error) throw new Error(error.message);
    if (!data?.session) throw new Error("Session not found");
    return data.session.token;
  },
};

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";
import Logo from "@/src/components/logo";
import { CopyIcon } from "@/src/components/landing/icons";


export default function AuthSuccessPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your session...");
  const [token, setToken] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function verify() {
      const callbackUrl = params.get("callbackUrl");
      try {
        const sessionToken = await authClient.getSessionToken();
        setToken(sessionToken);
        if (callbackUrl) {
          const res = await fetch(`${callbackUrl}/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: sessionToken }),
          });
          if (!res.ok) throw new Error(`CLI callback failed: ${res.status}`);
          setMessage("Your terminal is connected. You can close this window.");
        } else {
          setMessage("You're signed in. You can close this window.");
        }
        setStatus("success");
      } catch (err) {
        setStatus("error");
        if (err instanceof Error && /Session not found/.test(err.message)) {
          setNeedsLogin(true);
          setMessage("You need to sign in before continuing.");
        } else {
          setMessage(
            err instanceof Error
              ? err.message
              : "Authentication failed. Please try again.",
          );
        }
      }
    }
    verify();
  }, [params]);

  async function copyToken() {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = token;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-12">
      <div className="grid-lines" />
      <div className="relative z-10 w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <Logo className="h-20 w-20" />
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {status === "loading" && "Verifying your session..."}
            {status === "success" && "You're all set."}
            {status === "error" &&
              (needsLogin ? "Not signed in" : "Something went wrong")}
          </h1>
          <p className="lead mx-auto max-w-sm">{message}</p>
        </div>
        {status === "loading" && (
          <div className="flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
          </div>
        )}
        {status === "error" && needsLogin && (
          <a href="/auth/login" className="btn btn-primary">
            Sign in to continue
          </a>
        )}
        {token && status !== "loading" && (
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">
              Your CLI should have received this key automatically. If not, copy
              it and paste it into your terminal:
            </p>
            <div className="term flex items-center justify-between gap-3 px-4 py-3">
              <code className="t-cyan no-scrollbar overflow-x-auto whitespace-nowrap text-[12px]">
                {token}
              </code>
              <button
                onClick={copyToken}
                className="btn btn-ghost-dark flex shrink-0 items-center gap-2 px-3 py-1.5 text-xs"
              >
                <CopyIcon className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

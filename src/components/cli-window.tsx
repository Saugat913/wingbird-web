"use client";

import { useEffect, useState } from "react";

type Tone = "white" | "cyan" | "green" | "amber" | "red" | "gray";

const toneClass: Record<Tone, string> = {
  white: "text-white",
  cyan: "text-cyan-400",
  green: "text-emerald-400",
  amber: "text-amber-400",
  red: "text-red-400",
  gray: "text-neutral-500",
};

const logo = String.raw`
 __          ___             _     _         _
 \ \        / (_)           | |   (_)       | |
  \ \  /\  / / _ _ __   __ _| |__  _ _ __ __| |
   \ \/  \/ / | | '_ \ / _\` | '_ \| | '__/ _\` |
    \  /\  /  | | | | | (_| | |_) | | | | (_| |
     \/  \/   |_|_| |_|\__, |_.__/|_|_|  \__,_|
                        __/ |
                       |___|`.trim();

const STEPS: { command: string; lines: [Tone, string][]; showLogo?: boolean }[] = [
  {
    command: "wingbird auth login",
    showLogo: true,
    lines: [
      ["cyan", "[➜] No session token passed, opening browser for login..."],
      ["cyan", "[➜] Click here to login https://wingbird.dev/auth/login?callbackUrl=..."],
      ["green", "[✔] Received the token"],
      ["green", "[✔] Login successful. Logged in as Saugat"],
    ],
  },
  {
    command: "wingbird release android production",
    lines: [
      ["cyan", "[➜] Building release APK..."],
      ["green", "[✔] APK built successfully"],
      ["cyan", "[➜] Output build/app/outputs/flutter-apk/app-release.apk"],
      ["cyan", "[➜] APK size: 18.4 MB"],
      ["cyan", "[➜] Computing file hash..."],
      ["amber", "[⧗] Requesting upload URL..."],
      ["green", "[✔] Upload complete (id: upl_48a92f1)"],
      ["amber", "[⧗] Creating release record on server..."],
      ["green", "[✔] Release created successfully (ID: rel_99a82b)"],
    ],
  },
  {
    command: "wingbird patch android production",
    lines: [
      ["cyan", "[➜] Building release APK..."],
      ["amber", "[⧗] Downloading base release APK..."],
      ["cyan", "[➜] Processing architecture: arm64-v8a"],
      ["cyan", "[➜] Generating patch diff for arm64-v8a..."],
      ["amber", "[⧗] Creating patch records..."],
      ["green", "[✔] Successfully created 1 patch artifact(s) (1 architecture(s))!"],
    ],
  },
];

export default function CliWindow() {
const [step, setStep] = useState(0);
const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const { command, lines, showLogo } = STEPS[step];

  return (
    <div className="font-mono flex w-full flex-col border border-neutral-800 bg-black text-neutral-200 overflow-hidden rounded-md shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-[#0c0c0c] px-4 py-3 text-xs">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-sm bg-neutral-700" />
          ))}
        </div>
        <span className="text-[11px] uppercase tracking-widest text-neutral-500">wingbird-cli — v1.0</span>
        <div className="w-12" />
      </div>

      <div className="flex h-95 sm:h-105 flex-col justify-start overflow-auto bg-black p-4 text-xs sm:p-6 sm:text-sm">
        <div className="min-w-75 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-400">$</span>
            <span className="font-medium text-neutral-100">{command}</span>
          </div>

          {showLogo && (
            <pre className="my-3 overflow-hidden text-[9px] font-bold leading-none text-cyan-400 select-none sm:text-[10px] md:text-xs">
              {logo}
            </pre>
          )}

          <div className="space-y-1.5 pl-1 pt-2">
            {lines.map(([tone, text], i) => (
              <div key={i} className={toneClass[tone]}>
                <span className="font-bold">{text.slice(0, 3)}</span>
                {text.slice(3)}
              </div>
            ))}
            <span className="ml-0.5 inline-block h-4 w-2 align-middle bg-cyan-400 blink" />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-900 pt-5 text-[11px] text-neutral-600">
          <span className="font-mono tracking-widest">STEP {step + 1}/3</span>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-6 rounded-full transition-colors ${i === step ? "bg-cyan-400" : "bg-neutral-800"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

type TerminalLine = [className: string, text: string];

const logo = [
  " __          ___             _     _         _",
  " \\ \\        / (_)           | |   (_)       | |",
  "  \\ \\  /\\  / / _ _ __   __ _| |__  _ _ __ __| |",
  "   \\ \\/  \\/ / | | '_ \\ / _\` | '_ \\| | '__/ _\` |",
  "    \\  /\\  /  | | | | | (_| | |_) | | | | (_| |",
  "     \\/  \\/   |_|_| |_|\\__, |_.__/|_|_|  \\__,_|",
  "                        __/ |",
  "                       |___|",
].join("\\n");

export default function CliWindow() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setStep((prev) => (prev < 3 ? prev + 1 : 1)), 4000);
    return () => clearInterval(timer);
  }, []);

  const lines: TerminalLine[] =
    step === 1
      ? [
          ["t-cyan-400", "[➜] No session token passed, opening browser for login..."],
          ["t-cyan-400", "[➜] Click here to login https://wingbird.dev/auth/login?callbackUrl=..."],
          ["t-emerald-400", "[✔] Received the token"],
          ["t-emerald-400 font-bold", "[✔] Login successful. Logged in as Saugat"],
        ]
      : step === 2
        ? [
            ["t-cyan-400", "[➜] Building release APK..."],
            ["t-emerald-400", "[✔] APK built successfully"],
            ["t-cyan-400", "[➜] Output build/app/outputs/flutter-apk/app-release.apk"],
            ["t-cyan-400", "[➜] APK size: 18.4 MB"],
            ["t-cyan-400", "[➜] Computing file hash..."],
            ["t-amber-400", "[⧗] Requesting upload URL..."],
            ["t-emerald-400", "[✔] Upload complete (id: upl_48a92f1)"],
            ["t-amber-400", "[⧗] Creating release record on server..."],
            ["t-emerald-400 font-bold", "[✔] Release created successfully (ID: rel_99a82b)"],
          ]
        : [
            ["t-cyan-400", "[➜] Building release APK..."],
            ["t-amber-400", "[⧗] Downloading base release APK..."],
            ["t-cyan-400", "[➜] Processing architecture: arm64-v8a"],
            ["t-cyan-400", "[➜] Generating patch diff for arm64-v8a..."],
            ["t-amber-400", "[⧗] Creating patch records..."],
            ["t-emerald-400 font-bold", "[✔] Successfully created 1 patch artifact(s) (1 architecture(s))!"],
          ];

  const commands = [
    "wingbird auth login",
    "wingbird release android production",
    "wingbird patch android production",
  ];

  return (
    <div className="font-mono flex w-full flex-col border border-neutral-800 bg-black text-neutral-200 overflow-hidden rounded-md shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-[#0c0c0c] px-4 py-3 text-xs">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 bg-neutral-700 rounded-sm" />
          <span className="h-2.5 w-2.5 bg-neutral-700 rounded-sm" />
          <span className="h-2.5 w-2.5 bg-neutral-700 rounded-sm" />
        </div>
        <span className="text-neutral-500 truncate max-w-[180px] sm:max-w-none text-[11px] tracking-widest uppercase">
          wingbird-cli — v1.0
        </span>
        <div className="w-12" />
      </div>

      <div className="flex h-[380px] sm:h-[420px] flex-col justify-start bg-black p-4 sm:p-6 text-xs sm:text-sm overflow-x-auto overflow-y-auto">
        <div className="space-y-2 min-w-[300px]">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="text-neutral-100 font-medium">{commands[step - 1]}</span>
          </div>

          {step === 1 && (
            <pre className="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs leading-none select-none my-3 overflow-hidden font-bold">
              {logo}
            </pre>
          )}

          <div className="space-y-1.5 pl-1 pt-2">
            {lines.map(([cls, t]) => (
              <div key={t} className={cls}>
                <span className="font-bold">{t.slice(0, 3)}</span>
                {t.slice(3)}
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-cyan-400 blink align-middle ml-0.5" />
          </div>
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-neutral-900 text-[11px] text-neutral-600">
          <span className="tracking-widest font-mono">STEP {step}/3</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1 w-6 rounded-full transition-colors ${step === n ? "bg-cyan-400" : "bg-neutral-800"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

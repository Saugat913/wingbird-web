"use client";

import { useState } from "react";
import { AppleIcon, LinuxIcon, WindowsIcon, CopyIcon } from "./header";

const platforms = [
  {
    name: "macOS",
    arch: "Apple Silicon · Intel",
    icon: <AppleIcon className="h-9 w-9" />,
    cmd: "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/Saugat913/wingbird/releases/latest/download/wingbird-cli-installer.sh | sh",
  },
  {
    name: "Linux",
    arch: "x86_64 · aarch64",
    icon: <LinuxIcon className="h-9 w-9" />,
    cmd: "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/Saugat913/wingbird/releases/latest/download/wingbird-cli-installer.sh | sh",
  },
  {
    name: "Windows",
    arch: "x86_64",
    icon: <WindowsIcon className="h-9 w-9" />,
    cmd: 'powershell -ExecutionPolicy Bypass -c "irm https://github.com/Saugat913/wingbird/releases/latest/download/wingbird-cli-installer.ps1 | iex"',
  },
];

export default function Download() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(cmd: string) {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {}
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <section id="install" className="section">
      <div className="wrap">
        <div
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
          data-reveal
        >
          <div>
            <span className="eyebrow">Install</span>
            <h2 className="display">One command to install.</h2>
          </div>
          <a
            href="https://github.com/Saugat913/wingbird/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
          >
            All releases ↗
          </a>
        </div>

        <div className="flex flex-col divide-y divide-zinc-100" data-reveal>
          {platforms.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-1 items-center gap-8 py-9 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
                  {p.icon}
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-zinc-900">
                    {p.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-400">
                    {p.arch}
                  </p>
                </div>
              </div>

              <button
                onClick={() => copy(p.cmd)}
                className="term flex min-h-16 w-full cursor-pointer items-center justify-between gap-8 px-6 py-4 text-left transition-colors hover:border-zinc-600 md:min-h-20 md:px-7 md:py-5"
              >
                <code className="t-cyan no-scrollbar overflow-x-auto whitespace-nowrap text-[12px] leading-relaxed">
                  {p.cmd}
                </code>
                <span className="flex shrink-0 items-center text-white" aria-label="Copy command">
                  {copied === p.cmd ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

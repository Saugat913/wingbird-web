const steps = [
  {
    n: "01",
    title: "Add the SDK",
    desc: "Add Wingbird to your Flutter app and initialize it before runApp. The SDK checks for a published patch when the app starts.",
    cmd: "await Wingbird.init(channel: Channel.prod)",
    out: [
      ["t-cyan", "[➜] Checking for published patch..."],
      ["t-emerald", "[✔] Wingbird initialized"],
    ],
  },
  {
    n: "02",
    title: "Publish a release",
    desc: "Authenticate once, then let the CLI build your Android release and register it as the base release for future patches.",
    cmd: "wingbird release android production",
    out: [
      ["t-cyan", "[➜] Building release APK..."],
      ["t-emerald", "[✔] Release created  ·  rel_99a82b"],
    ],
  },
  {
    n: "03",
    title: "Ship a patch",
    desc: "Make your fix, then generate a binary diff against the published release. Wingbird uploads the patch for your app to pick up.",
    cmd: "wingbird patch android production",
    out: [
      ["t-cyan", "[➜] Diffing arm64-v8a..."],
      ["t-emerald", "[✔] Patch artifact created  ·  ~180 KB"],
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--surface">
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="display">
              From Flutter project<br />to live patch.
            </h2>
          </div>
          <p className="lead" style={{ maxWidth: "38ch", marginBottom: 0 }}>
            Integrate once, publish a release, then ship binary patches without waiting for a full app-store release.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} data-reveal className="card flex flex-col gap-6 p-7 md:p-8">
              <div className="flex items-center gap-4">
                <span className="step-num">{step.n}</span>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">{step.desc}</p>
              <div className="term mt-auto p-5">
                <div className="term-bar" style={{ padding: 0, marginBottom: 10 }}>
                  <span className="term-dot bg-zinc-700" />
                  <span className="term-dot bg-zinc-700" />
                  <span className="term-dot bg-zinc-700" />
                </div>
                <div className="px-1">
                  <div className="mb-3 flex gap-1">
                    <span className="t-dim">$</span>
                    <span className="t-cmd break-all">{step.cmd}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {step.out.map(([cls, text]) => (
                      <span key={text} className={cls}>{text}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2" data-reveal>
          <div className="card border-cyan-100 bg-white p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600">Developer flow</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Add the SDK once. Authenticate the CLI once. From there, release and patch commands handle the build, diff, and upload flow.
            </p>
          </div>
          <div className="card border-emerald-100 bg-white p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">What users get</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              On startup, the SDK checks for a compatible patch, downloads it when available, and applies the hot-fix to the app's Flutter binary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

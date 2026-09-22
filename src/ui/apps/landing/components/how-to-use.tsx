const steps = [
  {
    n: "01",
    title: "Add the Flutter SDK",
    desc: "Add Wingbird to your Flutter app, then initialize it before runApp. The SDK checks for a published patch when the app starts.",
    code: `dependencies:
  wingbird_sdk:
    git:
      url: https://github.com/Saugat913/wingbird-sdk.git`,
  },
  {
    n: "02",
    title: "Initialize Wingbird",
    desc: "Initialize the SDK before your application starts. Use the production channel for releases and the staging channel when testing.",
    code: `void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Wingbird.init(
    channel: Channel.prod,
  );

  runApp(const MyApp());
}`,
  },
  {
    n: "03",
    title: "Build and publish a release",
    desc: "Install the CLI, authenticate once, then let Wingbird build the Android release APK and register it as the base release.",
    code: `wingbird auth login
wingbird release android production`,
  },
  {
    n: "04",
    title: "Ship a patch",
    desc: "Make your Flutter code change and create a patch against the previously published release. Wingbird generates and uploads the binary diff.",
    code: `wingbird patch android production`,
  },
];

export default function HowToUse() {
  return (
    <section id="how-to-use" className="section section--surface">
      <div className="wrap">
        <div className="mb-16 max-w-3xl" data-reveal>
          <span className="eyebrow">How to use</span>
          <h2 className="display">
            From Flutter project<br />
            to live patch.
          </h2>
          <p className="lead mt-6 max-w-2xl">
            Add the SDK once, publish a base release with the CLI, then generate
            binary patches whenever you need to fix a live Flutter app.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.n}
              data-reveal
              className="card flex flex-col gap-6 p-7 md:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="step-num">{step.n}</span>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-zinc-500">
                {step.desc}
              </p>

              <pre className="term mt-auto overflow-x-auto p-5 text-[12px] leading-7">
                <code>{step.code}</code>
              </pre>
            </article>
          ))}
        </div>

        <div className="mt-8 border-l-2 border-cyan-400 pl-5" data-reveal>
          <p className="text-sm leading-relaxed text-zinc-500">
            The SDK alone does not publish patches. Your app needs to be built
            and released through the Wingbird CLI so the server has a base
            release to diff against.
          </p>
        </div>
      </div>
    </section>
  );
}

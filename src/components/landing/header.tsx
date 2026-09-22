import Link from "next/link";
import Logo from "../logo";
import { GithubIcon } from "./icons";

export default function Header() {
  return <header className="site-header">
    <div className="wrap flex items-center justify-between" style={{paddingBlock:18}}>
      <Link href="/" className="flex items-center gap-3">
        <Logo className="h-8 w-8 shrink-0"/>
        <span className="text-[22px] font-extrabold tracking-tight text-zinc-900">Wingbird</span>
      </Link>
      <div className="flex items-center gap-8">
        <nav className="nav-links hidden md:flex items-center gap-7">
          <a href="#how-it-works">How it works</a>
          <a href="#install">Install</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="https://github.com/Saugat913/wingbird" target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex items-center gap-2 py-2 px-4">
          <GithubIcon/>GitHub
        </a>
      </div>
    </div>
  </header>;
}

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { PAGE_ORDER } from "../content/pages";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Chat Eka - චැට් එක logo" className="h-7" />
            <span className="text-sm font-bold text-white">
              Chat Eka <span className="text-white/40 font-normal">· චැට් එක</span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold text-white/70 hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 rounded-full px-3 py-1.5 transition-all duration-200"
          >
            කතාබහ කරන්න · Go to Chat
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">{children}</main>

      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl mt-10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {PAGE_ORDER.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className={`text-sm transition-colors duration-200 ${
                  pathname === `/${p.slug}`
                    ? "text-indigo-300"
                    : "text-white/50 hover:text-white/90"
                }`}
              >
                {p.labelEn}
              </Link>
            ))}
          </nav>
          <p className="text-center text-xs text-white/35 mt-5">
            © 2026 Chat Eka · චැට් එක — A free Sinhala chatroom.
          </p>
        </div>
      </footer>
    </div>
  );
}

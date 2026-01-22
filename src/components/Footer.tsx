import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-300">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 grid gap-14 md:grid-cols-3">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            Explore trending, popular and top rated movies. Built for movie
            lovers who want more than just lists.
          </p>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Popular", href: "/popular" },
              { name: "Top Rated", href: "/top-rated" },
              { name: "Trending", href: "/trending" },
              { name: "Genres", href: "/genres" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="group inline-flex items-center gap-2 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 opacity-0 transition group-hover:opacity-100" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
            Data Source
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/5 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} MovieApp · Crafted with ❤️ for cinema
        lovers
      </div>
    </footer>
  );
};

export default Footer;

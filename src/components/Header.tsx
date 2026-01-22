import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchInput from "./ui/search-input";

const navigation = [
  { name: "Popular", href: "/popular" },
  { name: "Top Rated", href: "/top-rated" },
  { name: "Trending", href: "/trending" },
  { name: "Genres", href: "/genres" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-50
        transition-all duration-500
        ${
          scrolled
            ? "bg-gradient-to-r from-indigo-700/90 via-purple-700/90 to-pink-600/90 shadow-2xl"
            : "bg-gradient-to-r from-indigo-600/70 via-purple-600/70 to-pink-500/70"
        }
        backdrop-blur-xl
      `}
    >
    
      <div className="absolute inset-0 -z-10 blur-2xl opacity-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <nav className="mx-auto max-w-7xl h-16 px-6 lg:px-8 flex items-center justify-between">
     
        <div className="flex items-center">
          <Logo />
        </div>

  
        <div className="hidden lg:flex items-center gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `
                relative text-sm font-bold tracking-wide transition-all duration-300
                ${
                  isActive
                    ? `
                      text-transparent bg-clip-text
                      bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300
                      after:absolute after:-bottom-2 after:left-1/2
                      after:h-1 after:w-10 after:-translate-x-1/2
                      after:rounded-full
                      after:bg-gradient-to-r after:from-yellow-400 after:via-pink-400 after:to-purple-400
                      after:shadow-[0_0_15px_rgba(236,72,153,0.9)]
                    `
                    : "text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                }
              `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>


        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <SearchInput />
          </div>

      
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>


      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-gradient-to-b from-purple-700/95 to-indigo-800/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-6 space-y-5">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  text-lg font-bold transition
                  ${
                    isActive
                      ? "text-yellow-300"
                      : "text-white/80 hover:text-white"
                  }
                `
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-4 sm:hidden">
              <SearchInput />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
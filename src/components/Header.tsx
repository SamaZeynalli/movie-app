import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "./ui/search-input";

const navigation = [
  { name: "Popular", href: "/popular" },
  { name: "Top Rated", href: "/top-rated" },
  { name: "Trending", href: "/trending" },
  { name: "Genres", href: "/genres" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background border-b">
      <nav className="mx-auto max-w-7xl h-16 px-6 lg:px-8 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="hidden lg:flex justify-center gap-x-10">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `relative text-sm font-semibold transition
                 ${
                   isActive
                     ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                     : "text-foreground hover:text-primary"
                 }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex justify-end">
          <SearchInput />
        </div>
      </nav>
    </header>
  );
}

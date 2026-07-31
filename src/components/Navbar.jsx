import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all ${
        scrolled ? "bg-white/95 shadow-md" : "bg-surface/80"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-container-max mx-auto">
        <Link
          to="/"
          className="font-headline-md text-headline-md font-semibold text-primary"
        >
          Nuna Wasi
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="/#tienda"
          >
            Tienda
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="/#tour"
          >
            Tour Vivencial
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="/#historia"
          >
            Sobre Nosotros
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all">
            account_circle
          </span>
          <button className="md:hidden material-symbols-outlined text-primary text-3xl">
            menu
          </button>
        </div>
      </div>
    </nav>
  );
}

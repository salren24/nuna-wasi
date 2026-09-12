import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/#tienda", label: "Tienda" },
  { to: "/#tour", label: "Tour Vivencial" },
  { to: "/#historia", label: "Sobre Nosotros" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all ${
        scrolled || menuOpen ? "bg-white/95 shadow-md" : "bg-surface/80"
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
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === "/" && location.hash === link.to.slice(1);
            return (
              <Link
                key={link.to}
                className={`font-label-md text-label-md transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
                to={link.to}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Cuenta"
            className="material-symbols-outlined text-primary text-3xl cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all"
          >
            account_circle
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden material-symbols-outlined text-primary text-3xl"
          >
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant/20 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/reserva"
            className="mt-4 bg-primary text-surface text-center px-6 py-3 rounded-lg font-label-md"
          >
            Reservar Tour
          </Link>
        </div>
      </div>
    </nav>
  );
}

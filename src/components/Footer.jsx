import { Link } from "react-router-dom";
import { mapImage } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest w-full rounded-t-xl pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 max-w-container-max mx-auto mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="font-headline-sm text-headline-sm text-primary mb-6">
            Nuna Wasi
          </div>
          <p className="font-body-md text-on-surface-variant mb-8">
            Conectando almas con el corazón de la naturaleza a través del sagrado mundo de
            las abejas.
          </p>
          <div className="flex gap-4">
            <span
              aria-hidden="true"
              title="Próximamente"
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined">share</span>
            </span>
            <span
              aria-hidden="true"
              title="Próximamente"
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined">public</span>
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-label-md text-on-background mb-6 uppercase tracking-wider">
            Explorar
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-label-md text-on-surface-variant hover:text-primary transition-colors"
                to="/#tienda"
              >
                Tienda
              </Link>
            </li>
            <li>
              <Link
                className="font-label-md text-on-surface-variant hover:text-primary transition-colors"
                to="/#tour"
              >
                Tour Vivencial
              </Link>
            </li>
            <li>
              <Link
                className="font-label-md text-on-surface-variant hover:text-primary transition-colors"
                to="/#historia"
              >
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-md text-on-background mb-6 uppercase tracking-wider">
            Soporte
          </h4>
          <ul className="space-y-4">
            <li>
              <span
                title="Próximamente"
                className="font-label-md text-on-surface-variant/40 cursor-not-allowed"
              >
                Contacto
              </span>
            </li>
            <li>
              <span
                title="Próximamente"
                className="font-label-md text-on-surface-variant/40 cursor-not-allowed"
              >
                Privacidad
              </span>
            </li>
            <li>
              <Link
                className="font-label-md text-on-surface-variant hover:text-primary transition-colors"
                to="/#newsletter"
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-md text-on-background mb-6 uppercase tracking-wider">
            Ubicación
          </h4>
          <p className="font-body-md text-on-surface-variant mb-4">
            Valle de Cieneguilla, Lima - Perú
          </p>
          <div className="w-full h-32 rounded-lg bg-surface-container overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all"
              style={{ backgroundImage: `url('${mapImage}')` }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-outline-variant/30 pt-8 px-6 md:px-16 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-md text-on-surface-variant text-sm">
          © {new Date().getFullYear()} Nuna Wasi - Alma de la Colmena. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">
            payments
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">
            local_shipping
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">
            verified_user
          </span>
        </div>
      </div>
    </footer>
  );
}

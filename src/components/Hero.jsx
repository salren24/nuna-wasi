import { Link } from "react-router-dom";
import { heroImage } from "../data/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-16 max-w-container-max mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6 leading-tight">
            Nuna Wasi: Descubre el <span className="text-primary italic">Alma</span> de la
            Colmena
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
            Miel pura de origen y experiencias que conectan con la vida, recolectada con
            respeto y amor por la biodiversidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/#tienda"
              className="bg-primary text-surface px-8 py-4 rounded-lg font-label-md hover:scale-102 transition-transform shadow-lg text-center"
            >
              Ver Tienda
            </Link>
            <Link
              to="/reserva"
              className="border-2 border-primary-container text-primary px-8 py-4 rounded-lg font-label-md hover:bg-primary-container/10 transition-all text-center"
            >
              Reservar Tour
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="material-symbols-outlined text-primary text-4xl">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { tourImage, tourIncludes } from "../data/content";

export default function TourVivencial() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useEffect(() => {
    [blob1Ref.current, blob2Ref.current].forEach((el, index) => {
      if (!el) return;
      el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${10 * (index + 1)}px, ${-15 * (index + 1)}px)` },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 5000 + index * 1000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  return (
    <section id="tour" className="py-32 px-6 md:px-16 bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url('${tourImage}')` }}
              />
            </div>
            <div
              ref={blob1Ref}
              className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container rounded-full opacity-20 blur-3xl"
            />
            <div
              ref={blob2Ref}
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container rounded-full opacity-10 blur-3xl"
            />
          </div>

          <div className="lg:pl-12">
            <span className="font-label-md text-secondary uppercase tracking-widest mb-4 block">
              Experiencias Nuna Wasi
            </span>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8">
              TOUR VIVENCIAL DE APITURISMO - NUNA WASI 🌿🌻🐝
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Una aventura educativa donde conectas con la naturaleza y descubres el mundo
              de las abejas desde adentro.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <h4 className="font-label-md text-primary mb-3">¿Qué incluye?</h4>
                <ul className="space-y-3">
                  {tourIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="material-symbols-outlined text-primary text-lg">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
                <h4 className="font-label-md text-primary mb-3">Información y Precios</h4>
                <p className="text-sm mb-2">
                  <strong>Duración:</strong> 90 min (Grupos máx. 15)
                </p>
                <p className="text-sm mb-2">
                  <strong>Punto encuentro:</strong> Cieneguilla
                </p>
                <p className="text-sm mb-2">
                  <strong>Niños (4-12):</strong> S/ 15.00
                </p>
                <p className="text-sm">
                  <strong>Adultos:</strong> S/ 25.00{" "}
                  <span className="text-xs text-on-surface-variant">
                    (incluye 250g miel)
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-10 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Reservas
              </p>
              <p className="text-sm text-on-surface-variant">
                Domingo a Viernes con 3 días de anticipación. Pago del 50% por adelantado.
              </p>
            </div>

            <Link
              to="/reserva"
              className="inline-block bg-primary text-surface px-10 py-5 rounded-lg font-headline-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Reservar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

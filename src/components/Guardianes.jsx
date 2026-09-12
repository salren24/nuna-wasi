import { guardianesValues, guardianesImages } from "../data/content";
import FadeIn from "./FadeIn";

export default function Guardianes() {
  return (
    <section className="py-32 bg-surface-variant overflow-hidden">
      <div className="max-w-container-max mx-auto px-6 md:px-16">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            Guardianes de la Vida
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Nuestra misión va más allá de la miel. Trabajamos para restaurar ecosistemas y
            proteger a las abejas como pilar fundamental de la biodiversidad global.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 mb-24 max-w-4xl mx-auto">
          {guardianesValues.map((value, index) => (
            <FadeIn
              key={value.title}
              delay={index * 0.08}
              className={index % 2 !== 0 ? "sm:mt-16" : ""}
            >
              <div className="flex items-start gap-5">
                <span className="material-symbols-outlined text-4xl text-primary shrink-0">
                  {value.icon}
                </span>
                <div>
                  <h4 className="font-headline-sm text-lg mb-2">{value.title}</h4>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {guardianesImages.map((src, i) => (
            <div
              key={src}
              className={`w-48 h-56 soft-hex bg-cover bg-center ${i % 2 !== 0 ? "mt-12" : ""}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

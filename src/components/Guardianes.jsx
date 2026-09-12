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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          {guardianesValues.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.08}>
              <div className="bg-surface p-10 rounded-2xl text-center hover:scale-105 transition-transform h-full">
                <span className="material-symbols-outlined text-5xl text-primary mb-6">
                  {value.icon}
                </span>
                <h4 className="font-headline-sm mb-4">{value.title}</h4>
                <p className="font-body-md text-on-surface-variant text-sm">
                  {value.description}
                </p>
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

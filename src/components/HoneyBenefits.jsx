import { benefitsImages } from "../data/content";
import FadeIn from "./FadeIn";

export default function HoneyBenefits() {
  return (
    <section className="py-32 px-6 md:px-16 bg-surface-container-low">
      <FadeIn className="max-w-container-max mx-auto text-center mb-16">
        <h2 className="font-display-lg-mobile md:font-display-lg text-on-background mb-6">
          El Poder Natural de la Miel
        </h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Mucho más que un endulzante: una fuente de bienestar integral recolectada con amor
          en el Valle de Cieneguilla.
        </p>
      </FadeIn>
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {benefitsImages.map((src, i) => (
          <FadeIn key={src} delay={i * 0.1}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                alt={i === 0 ? "Beneficios de comer miel pura" : "Propiedades de la miel"}
                className="w-full h-auto object-cover"
                src={src}
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

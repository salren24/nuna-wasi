import { benefitsImages, honeyBenefits } from "../data/content";
import FadeIn from "./FadeIn";

export default function HoneyBenefits() {
  return (
    <section className="py-32 px-6 md:px-16 bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-12 items-center">
        <FadeIn className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              alt="Miel pura servida en un frasco de vidrio"
              className="w-full h-auto object-cover"
              src={benefitsImages[0]}
            />
          </div>
          <div className="hidden sm:block absolute -bottom-10 -right-10 w-2/5 rounded-2xl overflow-hidden shadow-xl border-4 border-surface-container-low">
            <img
              alt="Panal recién cosechado con miel fresca"
              className="w-full h-auto object-cover"
              src={benefitsImages[1]}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:pl-8">
          <span className="font-label-md text-secondary uppercase tracking-widest mb-4 block">
            Beneficios
          </span>
          <h2 className="font-display-lg-mobile md:font-display-lg text-on-background mb-6">
            El poder natural de la miel
          </h2>
          <p className="font-body-lg text-on-surface-variant mb-10 max-w-xl">
            Mucho más que un endulzante: una fuente de bienestar recolectada con respeto en
            el Valle de Cieneguilla.
          </p>

          <div className="space-y-8">
            {honeyBenefits.map((benefit, index) => (
              <FadeIn
                key={benefit.title}
                delay={0.15 + index * 0.08}
                className={`flex gap-5 pb-8 border-b border-outline-variant/30 ${
                  index === honeyBenefits.length - 1 ? "border-0 pb-0" : ""
                }`}
              >
                <span className="material-symbols-outlined text-3xl text-primary shrink-0">
                  {benefit.icon}
                </span>
                <div>
                  <h3 className="font-headline-sm text-lg mb-1">{benefit.title}</h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { logoImage, historiaImage } from "../data/content";

export default function NuestraHistoria() {
  return (
    <section id="historia" className="py-32 bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              alt="Nuna Wasi Logo"
              className="w-48 h-auto mb-8 opacity-90"
              src={logoImage}
            />
            <h2 className="font-display-lg-mobile md:font-display-lg text-on-background mb-8">
              Nuestra Historia: Sembrando Respeto
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Desde los años 50, nuestras raíces se entrelazan con la tierra. Lo que
              comenzó con mis abuelos —él, apicultor; ella, agricultora— se convirtió en
              un legado de manos humildes y corazones llenos de amor por la vida.
            </p>
            <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
              Crecimos entre colmenas y cultivos, aprendiendo que el campo y las abejas
              siempre van de la mano. Hoy, seguimos su camino cuidando la tierra y
              respetando el equilibrio natural para llevar el alma de la colmena hasta tu
              hogar.
            </p>
            <div className="flex gap-4 items-center">
              <div className="h-px bg-primary flex-grow" />
              <span className="font-label-md text-primary italic">Legado desde 1950</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary-container/20 rounded-[2rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <img
                alt="Historia Familiar"
                className="relative rounded-[2rem] shadow-xl w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src={historiaImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

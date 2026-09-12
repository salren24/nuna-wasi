import { products, galleryImages } from "../data/content";
import ProductCard from "./ProductCard";
import FadeIn from "./FadeIn";

export default function ProductsShowcase() {
  return (
    <section id="tienda" className="py-32 px-6 md:px-16 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <FadeIn className="mb-16">
          <h2 className="font-headline-md text-headline-md text-on-background mb-2">
            Cosecha de Reserva
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Productos artesanales, puros y sin filtrar directos de nuestra colmena.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <FadeIn key={img.src} delay={index * 0.06}>
              <div className="aspect-square bg-cover bg-center rounded-lg shadow-sm overflow-hidden group">
                <img
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  src={img.src}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

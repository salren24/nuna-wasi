import { products, galleryImages } from "../data/content";
import ProductCard from "./ProductCard";

export default function ProductsShowcase() {
  return (
    <section id="tienda" className="py-32 px-6 md:px-16 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background mb-2">
              Cosecha de Reserva
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Productos artesanales, puros y sin filtrar directos de nuestra colmena.
            </p>
          </div>
          <a className="font-label-md text-primary text-underline-expand pb-1" href="#tienda">
            Ver catálogo completo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="aspect-square bg-cover bg-center rounded-lg shadow-sm overflow-hidden group"
            >
              <img
                alt={img.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                src={img.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

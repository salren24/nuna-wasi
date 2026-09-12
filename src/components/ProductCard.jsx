export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="rounded-2xl overflow-hidden">
        <div
          className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
      </div>
      <div className="pt-5">
        <h3 className="font-headline-sm text-lg mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body-md text-on-surface-variant text-sm mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-baseline">
          <span className="font-headline-sm text-primary text-xl">{product.price}</span>
          <a
            href="#newsletter"
            className="font-label-md text-sm text-secondary hover:text-primary transition-colors"
          >
            Cómo comprar →
          </a>
        </div>
      </div>
    </div>
  );
}

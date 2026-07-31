export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(124,88,0,0.08)] transition-all duration-300 hover:scale-[1.02]">
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${product.image}')` }}
      />
      <div className="p-6">
        <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-primary transition-colors text-lg">
          {product.name}
        </h3>
        <p className="font-body-md text-on-surface-variant text-sm mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-headline-sm text-primary text-xl">{product.price}</span>
          <button className="material-symbols-outlined bg-surface-container text-primary p-2 rounded-full hover:bg-primary hover:text-surface transition-all">
            add
          </button>
        </div>
      </div>
    </div>
  );
}

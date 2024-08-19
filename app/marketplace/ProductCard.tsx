import images from '@/public/images'

export default function ProductCard({ product }) {
    return (
      <div className="border rounded-md p-4">
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md" />
        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-gray-500">${product.price}</p>
      </div>
    );
  }
  
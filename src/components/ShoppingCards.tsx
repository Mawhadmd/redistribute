import React from "react";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
}

interface ShoppingCardsProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export default function ShoppingCards({
  products,
  onAddToCart,
}: ShoppingCardsProps) {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white w-full sm:w-64 flex flex-row sm:flex-col   rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
        >
          {/* Product Image */}
          <div className="aspect-square w-1/3 sm:w-full bg-gray-100 flex  items-center justify-center relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
              {product.category}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 w-2/3 sm:w-full">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="text-2xl font-bold text-accent">
                ${product.price}
              </div>
              <button
                onClick={() => onAddToCart(product.id)}
                className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

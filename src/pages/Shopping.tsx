import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, Filter } from "lucide-react";

export default function Shopping() {
  const [cart, setCart] = useState<number[]>([]);
  const [itemAdded, setItemAdded] = useState(false);

  const products = [
    {
      id: 1,
      name: "Ring Light Pro",
      price: 49.99,
      rating: 4.8,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80",
      category: "Lighting",
      description: "Professional LED ring light with adjustable brightness",
    },
    {
      id: 2,
      name: "Wireless Lavalier Mic",
      price: 79.99,
      rating: 4.9,
      reviews: 456,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80",
      category: "Audio",
      description: "Crystal clear audio for content creators",
    },
    {
      id: 3,
      name: "Smartphone Gimbal",
      price: 129.99,
      rating: 4.7,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
      category: "Stabilization",
      description: "3-axis gimbal for smooth video recording",
    },
    {
      id: 4,
      name: "Softbox Lighting Kit",
      price: 89.99,
      rating: 4.6,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
      category: "Lighting",
      description: "Complete softbox setup for professional lighting",
    },
    {
      id: 5,
      name: "USB Condenser Mic",
      price: 99.99,
      rating: 4.9,
      reviews: 567,
      image:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&q=80",
      category: "Audio",
      description: "Studio-quality USB microphone",
    },
    {
      id: 6,
      name: "Green Screen Backdrop",
      price: 39.99,
      rating: 4.5,
      reviews: 201,
      image:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80",
      category: "Backgrounds",
      description: "Collapsible chroma key green screen",
    },
    {
      id: 7,
      name: "Camera Tripod Stand",
      price: 59.99,
      rating: 4.7,
      reviews: 389,
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
      category: "Accessories",
      description: "Adjustable tripod with phone mount",
    },
    {
      id: 8,
      name: "LED Panel Light",
      price: 119.99,
      rating: 4.8,
      reviews: 278,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
      category: "Lighting",
      description: "Bi-color LED panel with remote control",
    },
  ];

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    setItemAdded(true);
  };

  useEffect(() => {
    if (itemAdded) {
      const timer = setTimeout(() => {
        setItemAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [itemAdded]);

  const categories = [
    "All",
    "Lighting",
    "Audio",
    "Stabilization",
    "Backgrounds",
    "Accessories",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-accent to-primary py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Creator's Shop
          </h1>
          <p className="text-xl text-gray-600">
            Professional gear and equipment for content creators
          </p>
        </div>
        
        {/* Notify that item is added */}
        {itemAdded && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            ✓ Item added to cart!
          </div>
        )}
        
        {/* Filters */}
        <div className="mb-8 flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Categories:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-lg border bg-primary border-gray-300 hover:border-accent hover:bg-secondary transition text-secondary hover:text-accent font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Shopping Cart Badge */}
        <div className="fixed  top-6 right-6 z-50">
          <button className="relative group p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <div className="absolute p-2 group-hover:flex hidden -bottom-8 -left-16 w-fit bg-red-500 text-white text-xs font-bold rounded-full items-center justify-center">
              It's a demo
            </div>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
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
              <div className="p-4">
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
                    onClick={() => addToCart(product.id)}
                    className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

 
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import ShoppingCards from "../components/ShoppingCards.tsx";
import { getShopItems, ShopItem } from "../lib/api.ts";
import { useCart } from "../contexts/CartContext.tsx";

export default function Shopping() {
  const { addToCart } = useCart();
  const [itemAdded, setItemAdded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getShopItems();
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (productId: number) => {
    addToCart(productId);
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
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary via-accent to-primary py-12 px-4 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading products...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Creator's Shop
          </h1>
          <p className="text-xl text-gray-600">
            Professional gear and equipment for content creators
          </p>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 px-4 py-2 border rounded-lg w-full max-w-md mx-auto"
          />
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
              onClick={() => {
                setFilter(category);
              }}
              className="px-4 py-2 rounded-lg border bg-primary border-gray-300 hover:border-accent hover:bg-secondary transition text-secondary hover:text-accent font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <ShoppingCards
            products={products
              .filter(
                (product) => filter === "All" || product.category === filter
              )
              .filter(
                (product) =>
                  product.title.toLowerCase().includes(search.toLowerCase()) ||
                  product.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Filter } from "lucide-react";
import ShoppingCards from "../../components/ShoppingCards";
import { getShopItems, ShopItem } from "../../lib/supabase";

export default function Shopping() {
  const [cart, setCart] = useState<number[]>([]);
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

        {itemAdded && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            ✓ Item added to cart!
          </div>
        )}

        <div className="mb-8 flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Categories:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className="px-4 py-2 rounded-lg border bg-primary border-gray-300 hover:border-accent hover:bg-secondary transition text-secondary hover:text-accent font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <button className="relative group p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center pointer-events-none">
                {cart.length}
              </span>
            )}
            <div className="absolute p-2 group-hover:flex hidden -top-8 -left-16 w-fit bg-red-500 text-white text-xs font-bold rounded-full items-center justify-center pointer-events-none">
              There is no checkout
            </div>
          </button>
        </div>

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
            onAddToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
}

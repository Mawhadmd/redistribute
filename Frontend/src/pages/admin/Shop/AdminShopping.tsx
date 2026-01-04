import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Upload, X } from "lucide-react";
import {
  getShopItems,
  addShopItem,
  updateShopItem,
  deleteShopItem,
  uploadImage,
  ShopItem,
} from "../../../lib/api.ts";
import AdminShopCard from "./AdminShopCard.tsx";

export default function AdminShopping() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<ShopItem>({
    title: "",
    description: "",
    price: 0,
    category: "",
    stars: 0,
    num_reviews: 0,
    reviews: "",
    Image_path: "",
  });

  const categories = [
    "Lighting",
    "Audio",
    "Stabilization",
    "Backgrounds",
    "Accessories",
  ];

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await getShopItems();
      setItems(data || []);
    } catch (error) {
      console.error("Error loading items:", error);
      alert("Failed to load items");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      price: 0,
      category: "Lighting",
      stars: 0,
      num_reviews: 0,
      reviews: "",
      Image_path: "",
    });
    setShowModal(true);
  }

  function openEditModal(item: ShopItem) {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingItem(null);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      setFormData({ ...formData, Image_path: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingItem && editingItem.id) {
        await updateShopItem(editingItem.id, formData);
      } else {
        await addShopItem(formData);
      }
      await loadItems();
      closeModal();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteShopItem(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-2/3 mx-auto">
      <div className="space-y-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Shop Items
          </h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No items found</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              <Plus className="w-5 h-5" />
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="space-y-2 flex items-center justify-center flex-col w-full">
            {items.map((item) => (
              <AdminShopCard
                key={item.id}
                item={item}
                openEditModal={openEditModal}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 !m-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? "Edit Item" : "Add New Item"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                {/* Price and Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      required
                      value={formData.stars}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stars: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Reviews *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.num_reviews}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          num_reviews: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1"
                      required={!formData.Image_path}
                    />
                    {uploading && (
                      <span className="text-sm text-gray-500">
                        Uploading...
                      </span>
                    )}
                  </div>
                  {formData.Image_path ? (
                    <div className="mt-2">
                      <img
                        src={formData.Image_path}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Image uploaded
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Please upload an image before submitting
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !formData.Image_path}
                    className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading
                      ? "Uploading..."
                      : editingItem
                      ? "Update Item"
                      : "Add Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

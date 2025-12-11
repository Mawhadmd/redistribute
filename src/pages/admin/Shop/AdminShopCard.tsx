import { Edit, Trash } from "lucide-react";
import React from "react";

export default function AdminShopCard({
  item,
  openEditModal,
  handleDelete,
}: {
  item: any;
  openEditModal: (item: any) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <div
      key={item.id}
      className="bg-white rounded-md shadow-sm border w-full border-gray-200 overflow-hidden flex items-center gap-3 p-2"
    >
      <div className="w-20 h-20 bg-gray-100 relative flex-shrink-0 rounded">
        <img
          src={item.Image_path}
          alt={item.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-xs text-gray-900 truncate">
            {item.title}
          </h3>
          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium">
            {item.category}
          </span>
        </div>
        <p className="text-[10px] text-gray-600 mb-1.5 line-clamp-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-accent">${item.price}</span>
          <span className="text-[10px] text-gray-500">
            ⭐ {item.stars} ({item.num_reviews})
          </span>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => openEditModal(item)}
          className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs font-medium"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => item.id && handleDelete(item.id)}
          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs font-medium"
        >
          <Trash className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

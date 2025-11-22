import React from "react";
import { Video, Upload, Filter } from "lucide-react";

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your video content
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition">
          <Upload className="w-5 h-5" />
          Upload Video
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Content library coming soon
        </h3>
        <p className="text-gray-600">Upload and manage your videos here</p>
      </div>
    </div>
  );
}

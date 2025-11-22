import React from "react";
import { Calendar, Clock } from "lucide-react";

export default function Schedule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Schedule</h1>
          <p className="text-gray-600 mt-1">Plan and schedule your posts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition">
          <Clock className="w-5 h-5" />
          Schedule Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Schedule view coming soon
        </h3>
        <p className="text-gray-600">View and manage your posting schedule</p>
      </div>
    </div>
  );
}

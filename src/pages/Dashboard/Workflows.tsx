import React, { useState } from "react";
import { Plus, Play, Pause, Trash2, Edit, Copy } from "lucide-react";

export default function Workflows() {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Morning Social Boost",
      description:
        "Post to Instagram, TikTok, and YouTube every morning at 8 AM",
      status: "active",
      schedule: "Daily at 8:00 AM",
      platforms: ["Instagram", "TikTok", "YouTube"],
      postsCount: 47,
    },
    {
      id: 2,
      name: "Evening Engagement",
      description: "Cross-post to Facebook and Twitter at 6 PM",
      status: "active",
      schedule: "Daily at 6:00 PM",
      platforms: ["Facebook", "Twitter"],
      postsCount: 32,
    },
    {
      id: 3,
      name: "Weekend Special",
      description: "Saturday and Sunday content distribution",
      status: "paused",
      schedule: "Sat-Sun at 10:00 AM",
      platforms: ["Instagram", "Facebook", "YouTube"],
      postsCount: 15,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="text-gray-600 mt-1">
            Automate your content distribution across platforms
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition">
          <Plus className="w-5 h-5" />
          Create Workflow
        </button>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {workflow.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {workflow.description}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  workflow.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {workflow.status.charAt(0).toUpperCase() +
                  workflow.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Schedule:</span>
                <span>{workflow.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Platforms:</span>
                <div className="flex gap-1">
                  {workflow.platforms.map((platform, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded text-xs"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Posts:</span>
                <span>{workflow.postsCount} published</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
                {workflow.status === "active" ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Resume
                  </>
                )}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition ml-auto">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no workflows) */}
      {workflows.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No workflows yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first workflow to automate content distribution across
              all your social media platforms.
            </p>
            <button className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition">
              Create Your First Workflow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

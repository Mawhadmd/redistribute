import React from "react";
import { Youtube, Calendar, TrendingUp, Lock } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Content Creator Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Monitor your YouTube channels and track upload activity
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-8">
        <div className="flex items-start gap-4">
          <Lock className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Social Media Integration - ISD
            </h2>
            <p className="text-gray-600 mb-2">
              Channel monitoring and upload tracking features are currently
              being developed separately.
            </p>
            <p className="text-sm text-gray-500">
              This section will be available once the standalone module is
              complete.
            </p>
          </div>
        </div>
      </div>

      {/* Planned Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <Youtube className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Channel Monitoring</h3>
          </div>
          <p className="text-sm text-gray-600">
            Track multiple channels and verify ownership
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">
              Upload Notifications
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Instant alerts when tracked channels post new videos
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Content Scheduling</h3>
          </div>
          <p className="text-sm text-gray-600">
            Organize redistribution workflow and timing
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> YouTube features are in standalone development (ISD). The module is being built separately to maintain code quality and system stability.
        </p>
      </div>
    </div>
  );
}

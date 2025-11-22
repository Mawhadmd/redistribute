import React from "react";
import { TrendingUp, Eye, Heart, Share2 } from "lucide-react";

export default function Analytics() {
  const metrics = [
    {
      label: "Total Views",
      value: "156.2K",
      change: "+23%",
      trend: "up",
      icon: Eye,
    },
    {
      label: "Engagement Rate",
      value: "8.4%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
    },
    {
      label: "Shares",
      value: "3,421",
      change: "+15%",
      trend: "up",
      icon: Share2,
    },
    {
      label: "Growth",
      value: "+12.5%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const topPosts = [
    {
      title: "Summer Product Launch",
      views: "45.2K",
      engagement: "12.3%",
      platform: "Instagram",
    },
    {
      title: "Behind the Scenes",
      views: "38.7K",
      engagement: "10.8%",
      platform: "TikTok",
    },
    {
      title: "Tutorial: Getting Started",
      views: "32.1K",
      engagement: "9.4%",
      platform: "YouTube",
    },
    {
      title: "Customer Success Story",
      views: "28.5K",
      engagement: "8.9%",
      platform: "Facebook",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Track your content performance across platforms
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-accent" />
                <span
                  className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Performance Over Time
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
          <p className="text-gray-400">Chart visualization would go here</p>
        </div>
      </div>

      {/* Top Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top Performing Posts
        </h2>
        <div className="space-y-4">
          {topPosts.map((post, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{post.platform}</p>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-sm text-gray-600">Views</p>
                  <p className="font-semibold text-gray-900">{post.views}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="font-semibold text-gray-900">
                    {post.engagement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

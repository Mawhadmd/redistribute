import { Video, Users, TrendingUp, Clock } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      icon: Video,
      label: "Videos Published",
      value: "147",
      change: "+12%",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Connected Accounts",
      value: "8",
      change: "+2",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      label: "Total Reach",
      value: "45.2K",
      change: "+18%",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Clock,
      label: "Time Saved",
      value: "23hrs",
      change: "+5hrs",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const recentActivity = [
    {
      action: "Published video to Instagram, TikTok, YouTube",
      time: "2 hours ago",
      status: "success",
    },
    {
      action: "Scheduled 5 videos for tomorrow",
      time: "5 hours ago",
      status: "success",
    },
    {
      action: "Added new Facebook account",
      time: "1 day ago",
      status: "success",
    },
    {
      action: 'Workflow "Morning Posts" completed',
      time: "2 days ago",
      status: "success",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div
                className={`w-2 h-2 mt-2 rounded-full ${
                  activity.status === "success" ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent/5 transition text-center">
            <Video className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-medium text-gray-900">Upload Video</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent/5 transition text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-medium text-gray-900">Connect Account</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent/5 transition text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-medium text-gray-900">Schedule Post</p>
          </button>
        </div>
      </div>
    </div>
  );
}

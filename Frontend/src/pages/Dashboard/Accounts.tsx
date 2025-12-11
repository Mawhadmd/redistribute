import React, { useState } from "react";
import {
  Plus,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  TrendingUp,
} from "lucide-react";

export default function Accounts() {
  const accounts = [
    {
      id: 1,
      platform: "Instagram",
      username: "@redistribute_official",
      followers: "12.5K",
      status: "connected",
      icon: Instagram,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      id: 2,
      platform: "TikTok",
      username: "@redistribute",
      followers: "25.3K",
      status: "connected",
      icon: TrendingUp,
      color: "text-black",
      bg: "bg-gray-50",
    },
    {
      id: 3,
      platform: "YouTube",
      username: "Redistribute Channel",
      followers: "8.2K",
      status: "connected",
      icon: Youtube,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      id: 4,
      platform: "Facebook",
      username: "Redistribute Page",
      followers: "5.7K",
      status: "connected",
      icon: Facebook,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="space-y-6">
          {/* Platform Limits */}
      <div className="bg-accent/20 border border-accent rounded-xl p-6">
        <h3 className="font-bold text-secondary/80 mb-2">Account Limits</h3>
        <p className="text-sm text-secondary/80">
          You're using <span className="font-semibold">4 of 10</span> available
          account slots on your current plan. Upgrade to connect unlimited
          accounts.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Connected Accounts
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your social media accounts
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition">
          <Plus className="w-5 h-5" />
          Add Account
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = account.icon;
          return (
            <div
              key={account.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${account.bg}`}>
                  <Icon className={`w-6 h-6 ${account.color}`} />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Connected
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {account.platform}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{account.username}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {account.followers}
                  </span>{" "}
                  followers
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Settings
                </button>
                <button className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
                  Disconnect
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Account Card */}
        <button className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-6 hover:border-accent hover:bg-accent/5 transition flex flex-col items-center justify-center min-h-[250px]">
          <Plus className="w-12 h-12 text-accent mb-4" />
          <p className="font-semibold text-gray-900">Add New Account</p>
          <p className="text-sm text-gray-600 mt-1">Connect another platform</p>
        </button>
      </div>

    
    </div>
  );
}

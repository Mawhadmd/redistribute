import React from "react";
import { CreditCard, CheckCircle } from "lucide-react";

export default function Billing() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Billing & Subscription
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Plan</h2>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold text-accent">
              Starter Plan - Free Trial
            </p>
            <p className="text-gray-600 mt-2">14 days remaining</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />3 Accounts per
                platform
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                1,000 Videos per month
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Basic analytics
              </li>
            </ul>
          </div>
          <a
            href="/pricing"
            className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
          >
            Upgrade Plan
          </a>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
        <p className="text-gray-600 mb-4">No payment method on file</p>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
          <CreditCard className="w-5 h-5" />
          Add Payment Method
        </button>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Billing History
        </h2>
        <p className="text-gray-600">No invoices yet</p>
      </div>
    </div>
  );
}

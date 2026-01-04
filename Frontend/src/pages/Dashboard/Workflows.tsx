import React, { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Trash2,
  Zap,
  CheckCircle,
} from "lucide-react";

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: string;
  actions: string[];
  executionCount: number;
}

export default function Workflows() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows(
      workflows.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
  };

  const deleteWorkflow = (id: string) => {
    if (window.confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows(workflows.filter((w) => w.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="text-gray-600 mt-2">
            Automate your content distribution with custom workflows
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Workflow
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Workflow className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.filter((w) => w.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.reduce((acc, w) => acc + w.executionCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Workflow className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No workflows created yet</p>
            <p className="text-sm text-gray-500 mb-6">
              Create your first workflow to automate your content distribution
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              Create First Workflow
            </button>
          </div>
        ) : (
          workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {workflow.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        workflow.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {workflow.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{workflow.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Trigger: </span>
                      <span className="text-gray-900 font-medium">
                        {workflow.trigger}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Actions: </span>
                      <span className="text-gray-900 font-medium">
                        {workflow.actions.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Executions: </span>
                      <span className="text-gray-900 font-medium">
                        {workflow.executionCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className={`p-2 rounded-lg transition ${
                      workflow.isActive
                        ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                    title={workflow.isActive ? "Pause" : "Activate"}
                  >
                    {workflow.isActive ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteWorkflow(workflow.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create New Workflow
            </h2>
            <p className="text-gray-600 mb-6">
              Workflow automation feature is not yet implemented. This will
              allow you to automatically distribute your content across multiple
              platforms when new videos are uploaded.
            </p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpgradeNotice() {
  const navigate = useNavigate();

  return (
    <div className="border border-dashed rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm mb-6">
      <div className="flex items-start gap-4">
        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
          <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-white">Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🔒 Upgrade to <span className="font-medium">Pro/Ultra</span> to unlock more features
          </p>
          <div className="mt-3 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded p-3">
            Get detailed insights into your reel performance with our paid plans.
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

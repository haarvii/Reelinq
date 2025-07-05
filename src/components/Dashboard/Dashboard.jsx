import React, { useState } from 'react';
import { Plus, LayoutGrid, List, Pencil, Trash2, Share2, Download } from 'lucide-react';
import UpgradeNotice from 'components/UpgradeNotice/UpgradeNotice';

const reels = [
  {
    id: 1,
    title: 'Untitled Reel',
    description: 'Instagram Quote Video',
    createdAt: 'Sep 2023',
    updatedAt: 'Today',
    thumbnail: 'https://placehold.co/300x540?text=Untitled+Reel'
  },
  {
    id: 2,
    title: 'Bhagavad Gita Wisdom',
    description: 'YouTube Short',
    createdAt: 'Oct 2023',
    updatedAt: '2 days ago',
    thumbnail: 'https://placehold.co/300x540?text=Wisdom+Clip'
  }
];

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('grid');
  const userPlan = 'Free'; // or 'Paid'

  return (
    <div className="p-6 space-y-6">

      {userPlan === 'Free' && <UpgradeNotice />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Reels</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Create New Tile */}
          <div className="aspect-[9/16] w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <Plus className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-500 mt-2">Create New</p>
          </div>

          {/* Existing Reels */}
          {reels.map(reel => (
            <div key={reel.id} className="relative group bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-[9/16] bg-gray-100 relative">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black/70 px-3 py-2">
                  <h3 className="text-white text-sm font-semibold truncate">{reel.title}</h3>
                  <p className="text-white text-xs truncate">{reel.description}</p>
                </div>
              </div>

              {/* Action Icons on Hover */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 border-b">
              <tr>
                <th className="py-3 px-4">Thumbnail</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Last Edited</th>
              </tr>
            </thead>
            <tbody>
              {reels.map(reel => (
                <tr key={reel.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4">
                    <img src={reel.thumbnail} alt="" className="w-16 h-24 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 font-medium">{reel.title}</td>
                  <td className="py-2 px-4">{reel.description}</td>
                  <td className="py-2 px-4 text-xs text-gray-500">{reel.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
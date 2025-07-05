import { useState } from 'react';
import { Edit2, Trash, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import BrandModal from 'components/BrandSelector/BrandModal';

export default function Brands() {
  const { brands } = useSelector((state) => state.brand); // Update if you use RTK Query or another store
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Your Brands</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Brand Cards */}
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="relative group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Cover Image */}
            <div className="relative h-36 bg-gray-200">
              <img
                src={brand.coverImage}
                alt={`${brand.name} cover`}
                className="w-full h-full object-cover"
              />
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="absolute -bottom-6 left-4 w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 bg-white object-cover"
              />
            </div>

            {/* Brand Info */}
            <div className="pt-8 px-4 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{brand.name}</h3>
              {brand.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {brand.description}
                </p>
              )}
            </div>

            {/* Hover Action Icons */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                <Edit2 className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </button>
              <button className="p-1 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}

        {/* Create New Brand Card */}
        <div
          onClick={() => setIsBrandModalOpen(true)} // Pass via props/context
          className="flex items-center justify-center h-52 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <div className="text-gray-500 dark:text-gray-300 flex flex-col items-center">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Create New Brand</span>
          </div>
        </div>
      </div>
      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
}
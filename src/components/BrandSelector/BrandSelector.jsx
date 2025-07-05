import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBrand } from '../../store/slices/brandSlice';
import BrandModal from './BrandModal';

export default function BrandSelector() {
  const dispatch = useDispatch();
  const { brands, selectedBrand } = useSelector((state) => state.brand);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const handleChange = (brand) => {
    if (brand.id === 'new') {
      // TODO: Trigger brand creation modal or page
      console.log('Create new brand...');
      setIsBrandModalOpen(true);
      return;
    }
    dispatch(setSelectedBrand(brand));
  };

  return (
    <div className="w-56 text-sm">
      <Listbox value={selectedBrand} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-5 pr-5 py-2 text-left cursor-pointer focus:outline-none">
            <span className="flex items-center gap-2">
              <img src={selectedBrand.logo} alt="" className="w-5 h-5 rounded object-cover" />
              {selectedBrand.name}
            </span>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg overflow-hidden">
            {brands.map((brand) => (
              <Listbox.Option
                key={brand.id}
                value={brand}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${
                    active ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-200'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <img src={brand.logo} alt="" className="w-5 h-5 rounded object-cover" />
                    <span className="flex-1">{brand.name}</span>
                    {selected && <Check className="w-4 h-4 text-primary" />}
                  </>
                )}
              </Listbox.Option>
            ))}

            {/* Create Brand CTA */}
            <Listbox.Option
              key="create-new"
              value={{ id: 'new' }}
              className="cursor-pointer px-4 py-2 text-primary hover:bg-primary/10 flex items-center gap-2 border-t border-gray-200 dark:border-gray-600"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Brand</span>
            </Listbox.Option>
          </Listbox.Options>
        </div>
      </Listbox>
      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
}
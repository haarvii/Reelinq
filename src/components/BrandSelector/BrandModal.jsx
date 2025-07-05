// components/Brand/BrandModal.jsx
import { useState } from 'react';
import { X } from 'lucide-react';
import Joi from 'joi';
import { useDropzone } from 'react-dropzone';

const stepOneSchema = Joi.object({
  name: Joi.string().min(3).required().label('Brand Name'),
  description: Joi.string().min(5).required().label('Description'),
  logo: Joi.any().custom((value, helpers) => {
    if (!value || typeof value !== 'object') return helpers.error('any.required');
    return value;
  }).required().label('Logo'),
  cover: Joi.any().optional(),
  themeColor: Joi.string().optional(),
});

const stepTwoSchema = Joi.object({
  tags: Joi.string().optional(),
  language: Joi.string().optional(),
  promptTemplate: Joi.string().optional(),
  socialLinks: Joi.string().optional(),
  status: Joi.string().valid('active', 'archived').optional(),
});

export default function BrandModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    cover: null,
    themeColor: '#000000',
    tags: '',
    language: '',
    promptTemplate: '',
    socialLinks: '',
    status: 'active',
  });
  const [errors, setErrors] = useState({});

  const onDropLogo = (acceptedFiles) => {
    setFormData(prev => ({ ...prev, logo: acceptedFiles[0] }));
  };

  const onDropCover = (acceptedFiles) => {
    setFormData(prev => ({ ...prev, cover: acceptedFiles[0] }));
  };

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({ onDrop: onDropLogo, accept: { 'image/*': [] } });
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({ onDrop: onDropCover, accept: { 'image/*': [] } });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { name, description, logo, cover, themeColor } = formData;
    const stepOneData = { name, description, logo, cover, themeColor };
    const { error } = stepOneSchema.validate(stepOneData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach(detail => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tags, language, promptTemplate, socialLinks, status } = formData;
    const stepTwoData = { tags, language, promptTemplate, socialLinks, status };
    const { error } = stepTwoSchema.validate(stepTwoData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach(detail => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log('Final brand data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl relative shadow-lg overflow-y-auto max-h-[95vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {step === 1 ? 'Basic Brand Info' : 'Additional Settings'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <input name="name" placeholder="Brand Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" rows={3} />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}

                <div {...getLogoRootProps()} className="border-dashed border-2 rounded-md px-4 py-6 text-center cursor-pointer">
                  <input {...getLogoInputProps()} />
                  <p className="text-sm">Drag 'n' drop logo image here, or click to select file</p>
                  {formData.logo && <p className="text-xs text-green-600 mt-1">Selected: {formData.logo.name}</p>}
                </div>
                {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}

                <div {...getCoverRootProps()} className="border-dashed border-2 rounded-md px-4 py-6 text-center cursor-pointer">
                  <input {...getCoverInputProps()} />
                  <p className="text-sm">Drag 'n' drop cover image here, or click to select file (optional)</p>
                  {formData.cover && <p className="text-xs text-green-600 mt-1">Selected: {formData.cover.name}</p>}
                </div>

                <label className="block font-medium">Theme Color</label>
                <input type="color" name="themeColor" value={formData.themeColor} onChange={handleChange} className="w-16 h-8" />

                <div className="flex justify-end">
                  <button type="button" onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-md">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <input name="tags" placeholder="Tags / Category (e.g. Gym, Motivation)" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                <input name="language" placeholder="Default Language (e.g. en, hi)" value={formData.language} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                <textarea name="promptTemplate" placeholder="Custom Prompt Template" value={formData.promptTemplate} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" rows={2} />
                <input name="socialLinks" placeholder="Social Links (comma-separated)" value={formData.socialLinks} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="border px-4 py-2 rounded-md">
                    Previous
                  </button>
                  <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">
                    Create Brand
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Preview Side */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-full shadow-sm">
            <div className="flex flex-col items-center justify-center gap-3">
              {formData.logo && (
                <img src={URL.createObjectURL(formData.logo)} alt="Logo" className="w-20 h-20 object-cover rounded-full border" />
              )}
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{formData.name || 'Brand Name'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{formData.description || 'Description here'}</p>
              {formData.cover && (
                <img src={URL.createObjectURL(formData.cover)} alt="Cover" className="w-full h-32 object-cover rounded mt-4" />
              )}
              <div className="w-full h-4 mt-2 rounded" style={{ backgroundColor: formData.themeColor }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

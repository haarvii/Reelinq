// components/BrandForm.jsx
import { useState } from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';

const brandSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label('Brand Name'),
  description: Joi.string().min(10).max(300).required().label('Description'),
  logo: Joi.any().required().label('Logo'),
  cover: Joi.any().optional().label('Cover Image'),
  themeColor: Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i).optional().label('Theme Color'),
});

export default function BrandForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    cover: null,
    themeColor: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = brandSchema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((d) => {
        validationErrors[d.path[0]] = d.message;
      });
      setErrors(validationErrors);
      toast.error('Please fix the validation errors.');
      return;
    }
    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Brand Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-medium">Logo (1:1) *</label>
        <input type="file" name="logo" accept="image/*" onChange={handleChange} />
        {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
      </div>

      <div>
        <label className="block font-medium">Cover Photo (Optional)</label>
        <input type="file" name="cover" accept="image/*" onChange={handleChange} />
      </div>

      <div>
        <label className="block font-medium">Theme Color (Optional)</label>
        <input
          type="color"
          name="themeColor"
          value={formData.themeColor}
          onChange={handleChange}
          className="w-16 h-10 rounded"
        />
        {errors.themeColor && <p className="text-red-500 text-sm mt-1">{errors.themeColor}</p>}
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Create Brand
      </button>
    </form>
  );
}

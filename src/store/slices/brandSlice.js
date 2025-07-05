import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBrand: { id: 1, name: 'General Reels', logo: 'https://placehold.co/10?text=Wisdom+Clips' },
  brands: [
    { id: 1, name: 'General Reels', logo: 'https://placehold.co/10?text=Wisdom+Clips' },
    { id: 2, name: 'Motivational Reels', logo: '/logos/motivation.png' },
    { id: 3, name: 'Gym Reels', logo: '/logos/gym.png' },
  ],
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { setSelectedBrand, setBrands } = brandSlice.actions;
export default brandSlice.reducer;
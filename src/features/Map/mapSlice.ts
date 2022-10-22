import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedContainer: {
    leafet_id: '',
    place_id: '',
    name: '',
  },
};

export const mapSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSelectedContainer: (state, action) => {
      const { id, container_id, name } = action.payload;
      state.selectedContainer = {
        leafet_id: id,
        place_id: container_id,
        name,
      };
    },
  },
});

export const { setSelectedContainer } = mapSlice.actions;

export default mapSlice.reducer;

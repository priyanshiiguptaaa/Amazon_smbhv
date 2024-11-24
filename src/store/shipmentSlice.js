import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async () => {
    const response = await axios.get('/api/shipments');
    return response.data;
  }
);

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState: {
    items: [],
    statistics: {
      activeShipments: 0,
      totalShipments: 0,
      documentation: 0,
      revenue: 0
    },
    loading: false,
    error: null
  },
  reducers: {
    updateShipmentStatus(state, action) {
      const { id, status } = action.payload;
      const shipment = state.items.find(s => s.id === id);
      if (shipment) {
        shipment.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

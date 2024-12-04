import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Multi-carrier rate comparison
export const compareShippingRates = async (shipmentDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shipping/compare-rates`, shipmentDetails);
    return response.data;
  } catch (error) {
    console.error('Error comparing shipping rates:', error);
    throw error;
  }
};

// Label generation
export const generateShippingLabel = async (shipmentId, carrierCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shipping/generate-label`, {
      shipmentId,
      carrierCode
    });
    return response.data;
  } catch (error) {
    console.error('Error generating shipping label:', error);
    throw error;
  }
};

// Tracking integration
export const getShipmentTracking = async (trackingNumber, carrier) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipping/track`, {
      params: { trackingNumber, carrier }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tracking info:', error);
    throw error;
  }
};

// Customs documentation
export const generateCustomsDocuments = async (shipmentId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shipping/customs-docs`, {
      shipmentId
    });
    return response.data;
  } catch (error) {
    console.error('Error generating customs documents:', error);
    throw error;
  }
};

// Container management
export const getContainerStatus = async (containerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipping/container/${containerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching container status:', error);
    throw error;
  }
};

export const updateContainerDetails = async (containerId, details) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/shipping/container/${containerId}`, details);
    return response.data;
  } catch (error) {
    console.error('Error updating container details:', error);
    throw error;
  }
};

// Temperature monitoring
export const getTemperatureData = async (containerId, timeRange) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipping/temperature/${containerId}`, {
      params: timeRange
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error;
  }
};

export const setTemperatureAlerts = async (containerId, thresholds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shipping/temperature/alerts`, {
      containerId,
      thresholds
    });
    return response.data;
  } catch (error) {
    console.error('Error setting temperature alerts:', error);
    throw error;
  }
};

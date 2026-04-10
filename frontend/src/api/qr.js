import api from './axios';

export const qrAPI = {
  generateToken: async (data) => {
    try {
      const response = await api.post('/qr/generate', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to generate QR token' };
    }
  },

  getSharedRecord: async (token) => {
    try {
      const response = await api.get(`/qr/shared/${token}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch shared record' };
    }
  }
};

export default qrAPI;

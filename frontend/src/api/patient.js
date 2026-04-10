import api from './axios';

export const patientAPI = {

  getProfile: async () => {
    try {
      const response = await api.get('/patients/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/patients/me', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update profile' };
    }
  },

  getVisits: async () => {
    try {
      const response = await api.get('/visits/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch visits' };
    }
  },

  getVisit: async (visitId) => {
    try {
      const response = await api.get(`/visits/${visitId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch visit' };
    }
  },

  createVisit: async (visitData) => {
    try {
      const response = await api.post('/visits/', visitData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create visit' };
    }
  },


  addPrescription: async (visitId, prescriptionData) => {
    try {
      const response = await api.post(`/visits/${visitId}/prescriptions`, prescriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to add prescription' };
    }
  },

  addMedication: async (visitId, medicationData) => {
    try {
      const response = await api.post(`/visits/${visitId}/medications`, medicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to add medication' };
    }
  },
};

export default patientAPI;
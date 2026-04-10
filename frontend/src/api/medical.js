import api from './axios';

export const medicalAPI = {

  uploadMedicalRecord: async (file, documentType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);

      const response = await api.post('/process-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to upload medical record' };
    }
  },

  getMedicalRecords: async () => {
    try {
      const response = await api.get('/reports/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch medical records' };
    }
  },

  getMedicalRecord: async (reportId) => {
    try {
      const response = await api.get(`/reports/${reportId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch medical record' };
    }
  },
};

export default medicalAPI;
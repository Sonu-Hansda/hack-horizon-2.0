import api from './axios';

export const medicalAPI = {

  uploadMedicalRecord: async (file, documentType, visitId = null) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);
      if (visitId) {
        formData.append('visit_id', visitId);
      }

      const response = await api.post('/reports/process-report', formData, {
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
      const response = await api.get('/reports');
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

  getTotalReports: async () => {
    try {
      const response = await api.get('/reports/total-reports');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch total reports' };
    }
  },

  getRecentReports: async () => {
    try {
      const response = await api.get('/reports/recent-reports');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch recent reports' };
    }
  },

  getActiveMedications: async () => {
    try {
      const response = await api.get('/reports/active-medications');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch active medications' };
    }
  },

  getVisits: async () => {
    try {
      const response = await api.get('/visits');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch visits' };
    }
  },

  linkReportToVisit: async (reportId, visitId) => {
    try {
      const response = await api.post(`/reports/${reportId}/link/${visitId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to link report to visit' };
    }
  },

  getDashboardSummary: async () => {
    try {
      const response = await api.get('/dashboard/summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch dashboard summary' };
    }
  },

  getReportSummary: async (reportId) => {
    try {
      const response = await api.get(`/reports/summary/${reportId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch report summary' };
    }
  },

  chatReport: async (reportId, question) => {
    try {
      const formData = new FormData();
      formData.append('question', question);
      const response = await api.post(`/report/${reportId}/chat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to chat with report' };
    }
  },
};

export default medicalAPI;
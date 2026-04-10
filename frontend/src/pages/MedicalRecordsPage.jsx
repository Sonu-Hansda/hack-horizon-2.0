import React from 'react';
import Layout from '../components/Layout';

const MedicalRecordsPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Medical Records</h1>
            <p className="text-slate-500 text-lg mb-6">Your complete health history in one secure place</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-600 mb-4">This section will contain:</p>
            <ul className="text-left text-slate-500 space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Lab results and test reports
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Doctor visit summaries
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Imaging and scan records
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Vaccination history
              </li>
            </ul>
            <div className="text-sm text-slate-400 font-medium">
              Coming soon • Under development
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalRecordsPage;

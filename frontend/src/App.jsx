import React, { useState } from 'react';
import Layout from './components/Layout';
import DashBoard from './components/DashBoard';
import MedicalReport from './components/MedicalReport';

const App = () => {
  const [activeTab, setActiveTab] = useState('Medical Records'); // Default state

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'Dashboard' && <DashBoard />}
      {activeTab === 'Medical Records' && <MedicalReport />}
      
      {activeTab !== 'Dashboard' && activeTab !== 'Medical Records' && (
        <div className="flex items-center justify-center h-full text-slate-400 font-medium text-lg">
          Content for {activeTab} is under construction...
        </div>
      )}
    </Layout>
  )
}

export default App;
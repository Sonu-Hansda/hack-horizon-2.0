import React, { useState, useEffect } from 'react';
import { 
  PillBottle, Calendar, FileText, CloudUpload, QrCode, 
  TestTube, Stethoscope, ClipboardPlus, Activity
} from 'lucide-react';
import StatsGrid from './dashboard/StatsGrid';
import BannerGrid from './dashboard/BannerGrid';
import ActivityFeed from './dashboard/ActivityFeed';
import { 
  RecordCompletionCard, 
  QuickAccessCard, 
  SupportAssistanceCard 
} from './dashboard/SidebarWidgets';
import { medicalAPI } from '../api';

export default function DashBoard() {
  const [stats, setStats] = useState({
    activeMedications: 0,
    recentVisits: 0,
    totalReports: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [totalData, recentData, medData] = await Promise.all([
          medicalAPI.getTotalReports(),
          medicalAPI.getRecentReports(),
          medicalAPI.getActiveMedications()
        ]);

        setStats({
          totalReports: totalData.total_reports || 0,
          recentVisits: recentData.recent_reports || 0, // Fallback to recent reports count if visits aren't tracked yet
          activeMedications: medData.active_medications || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { 
      icon: PillBottle, 
      value: stats.activeMedications.toString().padStart(2, '0'), 
      label: "Active Medications", 
      badge: "ACTIVE", 
      badgeColor: "text-[#0E7B62]" 
    },
    { 
      icon: Calendar, 
      value: stats.recentVisits.toString().padStart(2, '0'), 
      label: "Recent Activity (30d)", 
      badge: "RECENT", 
      badgeColor: "text-slate-400" 
    },
    { 
      icon: FileText, 
      value: stats.totalReports.toString().padStart(2, '0'), 
      label: "Reports Uploaded", 
      badge: "TOTAL", 
      badgeColor: "text-slate-400" 
    }
  ];

  const bannerData = [
    { 
      title: "Upload New Record",
      description: "Securely add lab results, imaging, or clinician notes for better tracking.",
      action: "Start Uploading",
      bg: "bg-slate-900",
      icon: CloudUpload,
      link: "/medical-records"
    },
    { 
      title: "Generate Access QR",
      description: "Create a secure token for medical professionals to view your health records.",
      action: "Create Token",
      bg: "bg-[#0E7B62]",
      icon: QrCode,
      link: "/share-qr"
    }
  ];

  const activities = [
    {
      icon: TestTube,
      iconBg: "bg-teal-50",
      iconColor: "text-[#0E7B62]",
      title: "Welcome to MediSync",
      time: "Just now",
      description: "Your secure digital health record platform is ready. Start by uploading your first medical report.",
      tags: ['SYSTEM']
    }
  ];

  const quickAccessItems = [
    { title: "Current Health Profile", time: "View Details", icon: Activity }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 lg:space-y-10 pb-12 pt-4 fadeIn">
      {/* Top Section: Stats */}
      <StatsGrid stats={statsData} />

      {/* Hero Section: Quick Actions */}
      <BannerGrid banners={bannerData} />

      {/* Main Content: Activity & Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 lg:gap-10">
        <ActivityFeed activities={activities} />

        <div className="space-y-8">
          <RecordCompletionCard percentage={stats.totalReports > 0 ? 100 : 20} />
          <QuickAccessCard items={quickAccessItems} />
          <SupportAssistanceCard />
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center py-10 mt-6 border-t border-slate-200/60 gap-6">
        <div className="flex items-center gap-4 flex-wrap justify-center font-bold">
          <span className="text-slate-900 text-[15px]">MediSync</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-[13px]">&copy; 2024 MediSync. HIPAA Compliant.</span>
        </div>
        <div className="flex items-center gap-6 lg:gap-8 flex-wrap justify-center text-[13px] font-bold">
          <a href="#" className="text-slate-500 hover:text-[#0E7B62] transition-colors">Privacy</a>
          <a href="#" className="text-slate-500 hover:text-[#0E7B62] transition-colors">Terms</a>
          <a href="#" className="text-slate-500 hover:text-[#0E7B62] transition-colors">Security</a>
          <a href="#" className="text-slate-500 hover:text-[#0E7B62] transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
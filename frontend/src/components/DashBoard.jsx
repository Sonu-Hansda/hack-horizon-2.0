import React from 'react';
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

export default function DashBoard() {
  const statsData = [
    { icon: PillBottle, value: "04", label: "Active Medications", badge: "ACTIVE", badgeColor: "text-[#0E7B62]" },
    { icon: Calendar, value: "12", label: "Recent Visits (30d)", badge: "RECENT", badgeColor: "text-slate-400" },
    { icon: FileText, value: "87", label: "Reports Uploaded", badge: "TOTAL", badgeColor: "text-slate-400" }
  ];

  const bannerData = [
    { 
      title: "Upload New Record",
      description: "Securely add lab results, imaging, or clinician notes for better tracking.",
      action: "Start Uploading",
      bg: "bg-slate-900",
      icon: CloudUpload
    },
    { 
      title: "Generate Access QR",
      description: "Create a secure token for medical professionals to view your health records.",
      action: "Create Token",
      bg: "bg-[#0E7B62]",
      icon: QrCode
    }
  ];

  const activities = [
    {
      icon: TestTube,
      iconBg: "bg-teal-50",
      iconColor: "text-[#0E7B62]",
      title: "Blood Panel Results Uploaded",
      time: "2 hours ago",
      description: "Comprehensive Metabolic Panel (CMP) results from City Central Lab added to Medical Records.",
      tags: ['LABS', 'PDF']
    },
    {
      icon: Stethoscope,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      title: "Cardiology Follow-up Visit",
      time: "Yesterday",
      description: "Routine consultation with Dr. Amelia Zhang. Vitals stable. Follow-up notes available for review.",
      tags: ['VISIT']
    },
    {
      icon: ClipboardPlus,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      title: "Prescription Renewal",
      time: "Jan 12, 2024",
      description: "Lisinopril 10mg renewed for 90 days. Next refill eligible on April 15.",
      tags: ['PHARMACY']
    }
  ];

  const quickAccessItems = [
    { title: "Vaccination Record 2024", time: "Updated 2d ago", icon: FileText },
    { title: "Recent EKG Results", time: "Updated 2w ago", icon: Activity }
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
          <RecordCompletionCard percentage={85} />
          <QuickAccessCard items={quickAccessItems} />
          <SupportAssistanceCard />
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center py-10 mt-6 border-t border-slate-200/60 gap-6">
        <div className="flex items-center gap-4 flex-wrap justify-center font-bold">
          <span className="text-slate-900 text-[15px]">Medi Sync</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-[13px]">&copy; 2024 Medi Sync. HIPAA Compliant.</span>
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
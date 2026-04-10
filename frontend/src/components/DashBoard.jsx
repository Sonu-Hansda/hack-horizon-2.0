import React, { useState, useEffect } from 'react';
import {
  PillBottle, Calendar, FileText, CloudUpload, QrCode,
  TestTube, Activity, Stethoscope, ClipboardList
} from 'lucide-react';
import StatsGrid from './dashboard/StatsGrid';
import BannerGrid from './dashboard/BannerGrid';
import ActivityFeed from './dashboard/ActivityFeed';
import {
  RecordCompletionCard,
  VitalStatsCard,
} from './dashboard/SidebarWidgets';
import { medicalAPI } from '../api';

export default function DashBoard() {
  const [data, setData] = useState({
    stats: {
      active_medications: 0,
      recent_activity_count: 0,
      total_reports: 0
    },
    activities: [],
    vitals: {},
    profile_completion: 20
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const summary = await medicalAPI.getDashboardSummary();
        setData(summary);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const statsData = [
    {
      icon: PillBottle,
      value: data.stats.active_medications.toString().padStart(2, '0'),
      label: "Active Medications",
      badge: "ACTIVE",
      badgeColor: "text-[#0E7B62]",
      link: "/medical-records"
    },
    {
      icon: Calendar,
      value: data.stats.recent_activity_count.toString().padStart(2, '0'),
      label: "Recent Activity (30d)",
      badge: "RECENT",
      badgeColor: "text-slate-400",
      link: "/history"
    },
    {
      icon: FileText,
      value: data.stats.total_reports.toString().padStart(2, '0'),
      label: "Reports Uploaded",
      badge: "TOTAL",
      badgeColor: "text-slate-400",
      link: "/medical-records"
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
      action: "Generate now",
      bg: "bg-[#0E7B62]",
      icon: QrCode,
      link: "/share"
    }
  ];

  const activities = data.activities.length > 0 ? data.activities.map(act => ({
    ...act,
    icon: act.type === 'visit' ? Stethoscope : FileText,
    iconBg: act.type === 'visit' ? "bg-teal-50" : "bg-indigo-50",
    iconColor: act.type === 'visit' ? "text-[#0E7B62]" : "text-indigo-600",
    time: formatRelativeTime(act.time)
  })) : [
    {
      icon: TestTube,
      iconBg: "bg-teal-50",
      iconColor: "text-[#0E7B62]",
      title: "Initial Setup Complete",
      time: "Just now",
      description: "Your secure digital health record platform is ready. Start by uploading your first medical report.",
      tags: ['SYSTEM']
    }
  ];

  if (loading) return <LoadingDashboard />;

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 lg:space-y-10 pb-12 pt-4 fadeIn">
      <StatsGrid stats={statsData} />

      <BannerGrid banners={bannerData} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 lg:gap-10">
        <ActivityFeed activities={activities} />

        <div className="space-y-8">
          <VitalStatsCard vitals={data.vitals} />
          <RecordCompletionCard percentage={data.profile_completion} />
        </div>
      </div>
    </div>
  );
}

function LoadingDashboard() {
    return (
        <div className="max-w-[1280px] mx-auto space-y-10 pb-12 pt-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[32px]"></div>)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[32px]"></div>)}
            </div>
        </div>
    );
}

function formatRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
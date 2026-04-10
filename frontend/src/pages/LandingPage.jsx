import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldPlus, 
  FileText, 
  QrCode, 
  Lock, 
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: FileText,
      title: 'Digital Health Records',
      description: 'Securely store and access your medical history, prescriptions, and lab results in one place.',
      color: 'text-[#0E7B62]',
      bg: 'bg-teal-50',
    },
    {
      icon: QrCode,
      title: 'QR-Based Sharing',
      description: 'Share specific records with healthcare providers using secure, time-limited QR codes.',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
    },
    {
      icon: Lock,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security with end-to-end encryption and strict access controls.',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
    },
    {
      icon: Users,
      title: 'Doctor Collaboration',
      description: 'Enable seamless communication between your healthcare providers for better care coordination.',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime', icon: Clock },
    { value: '256-bit', label: 'Encryption', icon: Lock },
    { value: 'HIPAA', label: 'Compliant', icon: ShieldPlus },
    { value: '24/7', label: 'Support', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800">
      {/* Header */}
      <header className="px-4 lg:px-10 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl flex items-center justify-center shadow-sm">
              <ShieldPlus size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-extrabold text-[18px] tracking-tight text-slate-900">HealthRecord</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-teal-600 uppercase mt-0.5">Precision Care</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#security" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Security
            </a>
            <a href="#about" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="teal" size="small">
                  <LayoutDashboard size={16} className="mr-1.5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="small">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="teal" size="small">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-10 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Your Health Records,<br />
                  <span className="text-[#0E7B62]">Secure & Accessible</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl">
                  A patient-centric platform for managing your medical history, 
                  sharing records securely, and collaborating with healthcare providers.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-8">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button variant="teal" size="large">
                        <LayoutDashboard size={18} className="mr-2" />
                        Go to Dashboard
                        <ArrowRight size={18} strokeWidth={2.5} />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/signup">
                        <Button variant="teal" size="large">
                          Start Free Trial
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" size="large">
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                {!isAuthenticated && (
                  <div className="flex items-center gap-6 text-[13px] text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#0E7B62]" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#0E7B62]" />
                      <span>14-day free trial</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-xl border border-slate-200/60">
              <h3 className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">
                Trusted by Patients & Providers
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-[#0E7B62] mb-3">
                      <stat.icon size={20} strokeWidth={2} />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-slate-600">Data Security</span>
                  <span className="text-[13px] font-bold text-[#0E7B62]">100%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E7B62] rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 lg:px-10 py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              Everything You Need for Your Health Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
              From secure record storage to seamless provider collaboration, 
              we've built the tools you need for comprehensive health management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#F4F7FB] rounded-[20px] p-6 lg:p-8 border border-slate-200/60 hover:border-slate-300 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-[14px] ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-[18px] font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-10 py-12 lg:py-20 bg-gradient-to-br from-[#1C2532] to-[#0D1520]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            {isAuthenticated ? 'Welcome Back!' : 'Ready to Take Control of Your Health Records?'}
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            {isAuthenticated 
              ? 'Continue managing your health records and collaborating with healthcare providers.' 
              : 'Join thousands of patients who trust HealthRecord with their medical data. Start your free trial today.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="teal" size="large">
                  <LayoutDashboard size={18} className="mr-2" />
                  Go to Dashboard
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="teal" size="large">
                    Get Started Free
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="large" className="text-white border-white/30 hover:border-white">
                    Sign In to Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-10 py-8 lg:py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-xl flex items-center justify-center">
                <ShieldPlus size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-extrabold text-[16px] tracking-tight text-slate-900">HealthRecord</h1>
                <p className="text-[9px] font-bold tracking-[0.2em] text-teal-600 uppercase">Precision Care</p>
              </div>
            </div>

            <div className="flex items-center gap-6 lg:gap-8 text-[12px] lg:text-[13px] font-medium text-slate-500">
              <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Security</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Contact</a>
            </div>

            <div className="text-[11px] text-slate-400 font-medium">
              &copy; {new Date().getFullYear()} HealthRecord. HIPAA Compliant.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
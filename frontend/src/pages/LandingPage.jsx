import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  ShieldPlus,
  HeartPulse,
  ShieldCheck,
  Activity,
  Play,
} from "lucide-react";
import { ReactTyped } from "react-typed";

const TypeWriter = ({ strings }) => {
  return (
    <ReactTyped
      loop
      typeSpeed={80}
      backSpeed={20}
      strings={strings}
      smartBackspace
      backDelay={1000}
      loopCount={0}
      showCursor
      cursorChar="|"
    />
  );
};

export default function LandingPage({ onEnterApp }) {
  
  const healthWords = [
    "Medicine",
    "Wellness",
    "Healing",
    "Recovery",
    "Vitality",
    "Care",
  ];

  const carouselCards = [
    {
      title: "High-Tech Facilities",
      desc: "Next-generation environments designed for optimal patient recovery out of the box.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Secure Data",
      desc: "Bank-level AES-256 encryption protects every row of patient data continuously.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Diagnostic Workflows",
      desc: "Integrated radiology and rapid laboratory result rendering workflows.",
      img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Telehealth Ready",
      desc: "Seamless 4K video infrastructure for remote consultations bridging gaps.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "AI Analysis",
      desc: "Predictive intelligence catching what the human eye might miss effortlessly.",
      img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] relative font-sans p-2 lg:p-4 pb-0">
      {/* Wrapper to give it the floating card look from the image */}
      <div className="w-full relative min-h-[96vh] rounded-[2.5rem] bg-slate-100 overflow-hidden shadow-sm flex flex-col">
        {/* BACKGROUND IMAGE - Overlays everything, text blocks sit on top. */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/bg3.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover object-[center_20%] opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Faint Watermark Text shown in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[15rem] leading-none font-extrabold text-[#D2CEC4] opacity-20 tracking-tighter whitespace-nowrap">
            Med + Med
          </h1>
        </div>

        <Navbar onEnterApp={onEnterApp} />

        {/* HERO CONTENT */}
        <section className="relative z-10 w-full flex-grow flex flex-col justify-end">
          {/* Top Left Floating Video Button */}
          <div className="absolute top-32 left-10 md:left-24 bg-white/40 backdrop-blur-md rounded-3xl p-3 flex items-center gap-3 shadow-lg border border-white/20 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-[#1C2532] text-white rounded-full flex items-center justify-center shadow-md">
              <Play size={16} fill="currentColor" className="ml-1" />
            </div>
            <img src="./bg3.jpeg" className="w-16 h-12 object-cover rounded-xl" />
          </div>

          {/* Bottom Right Glass Card */}
          <div className="absolute bottom-12 right-10 md:right-24 max-w-[320px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-8 shadow-2xl">
            <div className="absolute -top-6 -left-6 w-12 h-12 opacity-50">
              {/* Decorative droplet icon / shape, placeholder using svg */}
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-full h-full drop-shadow-md"
              >
                <path d="M12 2.69l5.66 5.66A8 8 0 1 1 6.34 8.35L12 2.69z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
              Stay healthy
              <br />
              with Med + Med
            </h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Meditation is a tool for the mind to achieve different states of
              being. Out of thousands of types of meditation, we offer a core of
              the most simple and effective practices.
            </p>
          </div>

          {/* Bottom Left Complex "Cut-out" Area */}
          <div className="relative w-full max-w-4xl z-20">
            {/* Upper Tab Step */}
            <div className="relative inline-block bg-[#F7F5F0] rounded-tr-[2rem] px-8 pt-8 pb-4">
              <div className="flex items-center gap-4">
                <div className="px-6 py-2.5 rounded-full border border-slate-300 text-sm font-bold text-slate-700 bg-white shadow-sm flex items-center justify-center">
                  Medical
                </div>
                <span className="text-sm font-bold text-slate-500 hidden sm:block">
                  Stay healthy with Med + Med
                </span>
              </div>

              {/* The inverted curve filling the gap strictly to the right of the upper tab! */}
              <div className="absolute bottom-0 -right-12 w-12 h-12 pointer-events-none overflow-hidden">
                <div className="w-full h-full rounded-bl-[2.5rem] shadow-[-24px_24px_0_0_#F7F5F0]"></div>
              </div>
            </div>

            {/* Main Text Block Step */}
            <div className="relative bg-[#F7F5F0] rounded-tr-[3rem] p-8 md:p-12 md:pr-16 lg:pb-16 w-full lg:w-[110%] max-w-4xl">
              <h1 className="text-6xl md:text-[5.5rem] font-medium leading-[1.05] tracking-[-0.03em] text-slate-900 mix-blend-normal">
                Health <br />
                <span className="flex items-center gap-4">
                  and{" "}
                  <span className="text-[#0E7A62] font-semibold">
                    <TypeWriter strings={healthWords} />
                  </span>
                </span>
              </h1>

              {/* Login and Sign Up Action Group */}
              {/* <div className="absolute bottom-10 right-8 md:right-16 flex items-center gap-3">
                <button
                  onClick={onEnterApp}
                  className="text-sm font-bold text-slate-700 hover:text-slate-900 px-4 transition-colors hidden sm:block"
                >
                  Sign in
                </button>
                <button
                  onClick={onEnterApp}
                  className="group flex items-center gap-4 bg-white hover:bg-slate-50 px-6 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all active:scale-95 cursor-pointer"
                >
                  <span className="text-sm font-extrabold text-slate-800">
                    Sign up
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-900 group-hover:scale-150 transition-transform"></div>
                </button>
              </div> */}

              {/* The inverted curve connecting right side to background */}
              <div className="absolute bottom-0 -right-12 w-12 h-12 pointer-events-none overflow-hidden">
                <div className="w-full h-full rounded-bl-[3rem] shadow-[-24px_24px_0_0_#F7F5F0]"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="relative bg-[#F7F5F0] py-20 overflow-hidden">
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-left {
            animation: marquee-left 25s linear infinite;
          }
          .marquee-right {
            animation: marquee-right 30s linear infinite;
          }
          .hexagon {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          }
          .hex-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .hex-card:hover {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
            border-radius: 1.5rem;
            z-index: 30;
            transform: scale(1.15);
          }
        `}</style>

        {/* Scrolling Text Lines — pass BEHIND the honeycomb */}
        <div className="absolute inset-0 flex flex-col justify-center gap-6 z-0 pointer-events-none select-none">
          {/* Line 1 — left */}
          <div className="flex w-max marquee-left opacity-[0.06]">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="text-[6rem] md:text-[8rem] font-black text-slate-900 whitespace-nowrap tracking-tighter mx-8">
                Patient Recovery &nbsp;·&nbsp; Precision Diagnostics &nbsp;·&nbsp; Smart Monitoring &nbsp;·&nbsp;
              </span>
            ))}
          </div>
          {/* Line 2 — right */}
          <div className="flex w-max marquee-right opacity-[0.05]">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="text-[5rem] md:text-[7rem] font-black text-slate-900 whitespace-nowrap tracking-tighter mx-8">
                AI Analysis &nbsp;·&nbsp; Secure Health Records &nbsp;·&nbsp; Telehealth &nbsp;·&nbsp; HIPAA Compliant &nbsp;·&nbsp;
              </span>
            ))}
          </div>
          {/* Line 3 — left, slower */}
          <div className="flex w-max marquee-left opacity-[0.04]" style={{ animationDuration: '40s' }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} className="text-[4rem] md:text-[6rem] font-black text-slate-900 whitespace-nowrap tracking-tighter mx-8">
                Wellness &nbsp;·&nbsp; Vitals Monitoring &nbsp;·&nbsp; Digital Health &nbsp;·&nbsp; Cloud Infrastructure &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

          {/* Left side — Section heading */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <span className="text-xs font-extrabold tracking-[0.25em] text-[#0E7A62] uppercase mb-4 block">Our Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Everything you need,<br />in one platform.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Hover over any cell to discover the powerful capabilities that make Medi Sync the most comprehensive clinical platform available.
            </p>
          </div>

          {/* Right side — Honeycomb Cluster (tightly packed, mixed sizes) */}
          <div className="lg:w-3/5 flex justify-center lg:justify-end">
            <div className="relative w-[480px] h-[520px]">

              {/* ── Large hex: top-center (biggest, like the tree in the image) ── */}
              <div className="absolute" style={{ top: '60px', left: '120px' }}>
                <div className="hexagon hex-card w-[200px] h-[230px] bg-[#0E7A62] relative cursor-pointer overflow-hidden group shadow-xl">
                  <img src={carouselCards[0].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                    <HeartPulse size={32} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-sm font-bold">Vitals</span>
                    <p className="text-white/80 text-[11px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">{carouselCards[0].desc}</p>
                  </div>
                </div>
              </div>

              {/* ── Medium hex: top-right ── */}
              <div className="absolute" style={{ top: '10px', left: '310px' }}>
                <div className="hexagon hex-card w-[140px] h-[160px] bg-slate-800 relative cursor-pointer overflow-hidden group shadow-lg">
                  <img src={carouselCards[1].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <ShieldCheck size={26} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-bold">Security</span>
                    <p className="text-white/80 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">{carouselCards[1].desc}</p>
                  </div>
                </div>
              </div>

              {/* ── Small hex: top-left ── */}
              <div className="absolute" style={{ top: '0px', left: '60px' }}>
                <div className="hexagon hex-card w-[100px] h-[115px] bg-[#156d57] relative cursor-pointer overflow-hidden group shadow-md">
                  <img src={carouselCards[2].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <Activity size={20} className="text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-[10px] font-bold">Diagnostics</span>
                    <p className="text-white/80 text-[9px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">{carouselCards[2].desc}</p>
                  </div>
                </div>
              </div>

              {/* ── Medium hex: left-middle ── */}
              <div className="absolute" style={{ top: '200px', left: '10px' }}>
                <div className="hexagon hex-card w-[150px] h-[170px] bg-slate-700 relative cursor-pointer overflow-hidden group shadow-lg">
                  <img src={carouselCards[3].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-65 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Play size={26} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-bold">Telehealth</span>
                    <p className="text-white/80 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">{carouselCards[3].desc}</p>
                  </div>
                </div>
              </div>

              {/* ── Large hex: center-bottom (second big one) ── */}
              <div className="absolute" style={{ top: '270px', left: '150px' }}>
                <div className="hexagon hex-card w-[190px] h-[220px] bg-[#0a6350] relative cursor-pointer overflow-hidden group shadow-xl">
                  <img src={carouselCards[4].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-65 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                    <ShieldPlus size={32} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-sm font-bold">AI Analysis</span>
                    <p className="text-white/80 text-[11px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">{carouselCards[4].desc}</p>
                  </div>
                </div>
              </div>

              {/* ── Small hex: right-middle ── */}
              <div className="absolute" style={{ top: '170px', left: '340px' }}>
                <div className="hexagon hex-card w-[110px] h-[125px] bg-[#0E7A62] relative cursor-pointer overflow-hidden group shadow-md">
                  <img src={carouselCards[0].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-55 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <HeartPulse size={22} className="text-white mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-[10px] font-bold">Recovery</span>
                    <p className="text-white/80 text-[9px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">Personalized recovery plans.</p>
                  </div>
                </div>
              </div>

              {/* ── Medium hex: bottom-right ── */}
              <div className="absolute" style={{ top: '340px', left: '340px' }}>
                <div className="hexagon hex-card w-[130px] h-[150px] bg-slate-900 relative cursor-pointer overflow-hidden group shadow-lg">
                  <img src={carouselCards[2].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Activity size={24} className="text-[#0E7A62] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-bold">Workflows</span>
                    <p className="text-white/80 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-tight">Streamlined clinical workflows.</p>
                  </div>
                </div>
              </div>

              {/* ── Tiny hex: bottom-left accent ── */}
              <div className="absolute" style={{ top: '380px', left: '60px' }}>
                <div className="hexagon hex-card w-[80px] h-[92px] bg-[#0E7A62]/70 relative cursor-pointer overflow-hidden group shadow-sm">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <ShieldCheck size={18} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="text-white text-[9px] font-bold mt-1">HIPAA</span>
                  </div>
                </div>
              </div>

              {/* ── Tiny hex: far top-right accent ── */}
              <div className="absolute" style={{ top: '130px', left: '420px' }}>
                <div className="hexagon hex-card w-[70px] h-[80px] bg-slate-600 relative cursor-pointer overflow-hidden group shadow-sm">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <HeartPulse size={16} className="text-[#0E7A62] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SECTIONS - IMAGE CAROUSEL */}
      <section className="-py-20 bg-[#F7F5F0] relative z-10 border-t border-slate-200 overflow-hidden">
        <style>{`
          @keyframes horizontal-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: horizontal-scroll 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Why choose Medi Sync?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Reimagining the electronic health record experience with speed,
            grace, and unbreakable security.
          </p>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Fade Out Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#F7F5F0] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#F7F5F0] to-transparent z-10 pointer-events-none"></div>

          {/* Animated Track */}
          <div className="flex w-max animate-marquee gap-6">
            {/* Render two identical sets of the array to allow for a seamless 50% loop */}
            {[...carouselCards, ...carouselCards].map((card, idx) => (
              <div
                key={idx}
                className="relative group w-[320px] md:w-[380px] h-[450px] rounded-3xl overflow-hidden shadow-sm flex-shrink-0 cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-200 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {card.desc}
                  </p>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#0E7A62] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
     

<footer className=" mt-16 py-16 border-t bg-gray-600 text-gray-300 rounded-xl">
  <div className="max-w-7xl mx-auto px-6">

    {/* Top Section */}
    <div className="flex flex-col lg:flex-row justify-between gap-10">

      {/* Left */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <img
            src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
            alt="logo"
            className="h-8"
          />
          <h2 className="text-xl font-semibold text-white">YourBrand</h2>
        </div>

        <p className="text-sm max-w-sm text-gray-400">
          A collection of components for your startup business or side project.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

        <div>
          <h3 className="mb-4 font-semibold text-white">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Overview</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Features</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help</a></li>
            <li><a href="#">Sales</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

      </div>
    </div>

    {/* Bottom */}
    <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
      <p>© 2026 YourBrand. All rights reserved.</p>

      <div className="flex gap-4 mt-3 md:mt-0">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
      </div>
    </div>

  </div>
</footer>
    </main>
  );
}

function Navbar({ onEnterApp }) {
  return (
    <nav className="absolute top-0 left-0 right-0 h-[100px] z-50 flex items-center justify-between px-8 lg:px-16 transition-all">
      {/* Left Logo (Preserved user branding + image layout) */}
      <div className="flex items-center gap-2.5">
        <div className="bg-[#0E7A62] text-white p-1.5 rounded-[12px] shadow-[0_2px_12px_rgba(14,122,98,0.3)]">
          <img src="./logo.png" className="h-8" alt="Logo" />
        </div>
        <div>
          <h1 className="font-extrabold text-[18px] tracking-tight text-slate-900 leading-none">
            Medi Sync
          </h1>
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0E7A62] uppercase block mt-1">
            Track & Care
          </span>
        </div>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-12 text-[14px] font-bold text-black-500/80 tracking-wide">
        <a href="#" className="hover:text-slate-900 transition-colors">
          About Us
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          Procedures
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          Skincare
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          Reviews
        </a>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          {/* Sign In */}
          <Link to='/login'><button
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 active:scale-95"
          >
            Sign In
          </button></Link>

          {/* Sign Up */}
          <Link to='/signup'><button
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-slate-800 hover:shadow-[0_6px_18px_rgba(0,0,0,0.2)] transition-all duration-200 active:scale-95"
          >
            Sign Up
          </button></Link>
        </div>

        <button className="bg-white hover:bg-slate-50 w-12 h-12 rounded-full flex gap-[3px] flex-col justify-center items-center shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-200 transition-all active:scale-95">
          <div className="w-4 h-[2px] bg-slate-800 rounded-full"></div>
          <div className="w-4 h-[2px] bg-slate-800 rounded-full"></div>
          <div className="w-2 h-[2px] mr-2 bg-slate-800 rounded-full"></div>
        </button>
      </div>
    </nav>
  );
}

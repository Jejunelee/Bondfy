// app/page.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

// --- Types ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// --- Helper Components ---
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDuration: '600ms', transitionTimingFunction: 'ease' }}
    >
      {children}
    </div>
  );
};

const MetricNumber: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`font-serif text-[48px] leading-none text-white tracking-[-0.03em] mb-2 transition-opacity duration-600 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Issuance');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-['DM_Sans',sans-serif] bg-[#F8F9F9] text-[#02084B] overflow-x-hidden antialiased">
      {/* --- NAV --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-12 h-[68px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(248,249,249,0.96)] shadow-[0_1px_0_rgba(30,58,138,0.08)]'
            : 'bg-[rgba(248,249,249,0.82)] backdrop-blur-[18px] border-b border-[rgba(30,58,138,0.12)]'
        }`}
      >
        <a href="#" className="flex items-center gap-2.5 no-underline" onClick={(e) => scrollToSection(e, 'home')}>
          <div className="w-8 h-8 relative">
            <Image 
              src="/Logo.png" 
              alt="Bondfy Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-['DM_Sans',sans-serif] font-semibold text-lg text-[#02084B] tracking-[-0.3px]">
            Bondfy
          </span>
        </a>
        <ul className="flex items-center gap-9 list-none">
          <li>
            <a 
              href="#platform" 
              onClick={(e) => scrollToSection(e, 'platform')}
              className="text-sm font-medium text-[#6B7A99] no-underline hover:text-[#02084B] transition-colors"
            >
              Platform
            </a>
          </li>
          <li>
            <a 
              href="#how" 
              onClick={(e) => scrollToSection(e, 'how')}
              className="text-sm font-medium text-[#6B7A99] no-underline hover:text-[#02084B] transition-colors"
            >
              How It Works
            </a>
          </li>
          <li>
            <a 
              href="#for-lgus" 
              onClick={(e) => scrollToSection(e, 'for-lgus')}
              className="text-sm font-medium text-[#6B7A99] no-underline hover:text-[#02084B] transition-colors"
            >
              For LGUs
            </a>
          </li>
          <li>
            <a 
              href="#investors" 
              onClick={(e) => scrollToSection(e, 'investors')}
              className="text-sm font-medium text-[#6B7A99] no-underline hover:text-[#02084B] transition-colors"
            >
              Investors
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="py-2 px-5 bg-[#02084B] text-white rounded-lg text-sm font-medium no-underline hover:opacity-85 transition-opacity"
            >
              Request Access
            </a>
          </li>
        </ul>
      </nav>

      {/* --- HERO --- */}
      <section className="min-h-screen flex items-center px-12 pt-30 pb-20 relative overflow-hidden bg-[#02084B]" id="home">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,rgba(91,163,248,0.22)_0%,transparent_70%),radial-gradient(ellipse_50%_70%_at_20%_80%,rgba(56,189,248,0.14)_0%,transparent_60%),radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(30,58,138,0.6)_0%,transparent_80%)]"></div>
        <div className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(rgba(91,163,248,1)_1px,transparent_1px),linear-gradient(90deg,rgba(91,163,248,1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 py-1 pl-2 pr-3 bg-[rgba(91,163,248,0.15)] border border-[rgba(91,163,248,0.3)] rounded-full text-[11px] font-semibold tracking-wide uppercase text-[#38BDF8] mb-7">
              <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-pulse"></div>
              Philippine LGU Bond Infrastructure
            </div>
            <h1 className="font-['DM_Serif_Display',serif] text-[clamp(42px,5vw,68px)] leading-[1.05] text-white tracking-[-0.02em] mb-6">
              The bond market<br />your city <em className="italic text-[#38BDF8] not-italic">deserves.</em>
            </h1>
            <p className="text-[17px] font-normal leading-relaxed text-[rgba(248,249,249,0.65)] max-w-[420px] mb-11">
              Bondfy is the digital infrastructure platform enabling Philippine local governments to issue, manage, and distribute bonds — compliantly, efficiently, and transparently.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="py-3.5 px-7 bg-white text-[#02084B] rounded-xl text-[15px] font-semibold no-underline inline-flex items-center gap-2 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all"
              >
                Request Early Access
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a 
                href="#platform" 
                onClick={(e) => scrollToSection(e, 'platform')}
                className="py-3.5 px-6 text-[rgba(248,249,249,0.75)] text-[15px] font-medium no-underline inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                See the platform
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-7 backdrop-blur-[12px] animate-float">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[12px] font-semibold tracking-wide uppercase text-[rgba(255,255,255,0.45)]">Active Bond Registry</span>
                <span className="py-0.5 px-2.5 bg-[rgba(56,189,248,0.2)] border border-[rgba(56,189,248,0.3)] rounded-full text-[11px] font-semibold text-[#38BDF8]">Live</span>
              </div>
              
              {[
                { icon: '🏙️', name: 'Davao City Infrastructure Bond', meta: '7yr · 5.5% coupon · PHP 300M', amount: 'PHP 300M', status: '● Fully Funded', statusColor: '#34D399' },
                { icon: '🌊', name: 'Iloilo Port Development Bond', meta: '5yr · 5.25% coupon · PHP 150M', amount: 'PHP 150M', status: '● Distributing', statusColor: '#34D399' },
                { icon: '🏫', name: 'Cagayan de Oro Education Bond', meta: '10yr · 6.0% coupon · PHP 200M', amount: 'PHP 200M', status: '● In Structuring', statusColor: '#FBBF24' }
              ].map((bond, idx) => (
                <div key={idx} className="flex items-center py-3.5 border-b border-[rgba(255,255,255,0.07)] gap-4 last:border-none">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(91,163,248,0.15)] border border-[rgba(91,163,248,0.2)] flex items-center justify-center text-sm shrink-0">{bond.icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[rgba(255,255,255,0.9)] mb-0.5">{bond.name}</div>
                    <div className="text-[11px] text-[rgba(255,255,255,0.4)]">{bond.meta}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-[rgba(255,255,255,0.9)] tabular-nums">{bond.amount}</div>
                    <div className="text-[11px] font-medium mt-0.5" style={{ color: bond.statusColor }}>{bond.status}</div>
                  </div>
                </div>
              ))}
              
              <div className="mt-5 p-4 bg-[rgba(255,255,255,0.04)] rounded-xl border border-[rgba(255,255,255,0.06)]">
                <div className="text-[11px] font-semibold tracking-wide uppercase text-[rgba(255,255,255,0.35)] mb-3">Bond Issuance Volume (PHP B)</div>
                <div className="flex items-end gap-1.5 h-[52px]">
                  {[30, 42, 38, 55, 48, 70, 62, 88, 78, 100].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 rounded-t bg-gradient-to-b from-[rgba(91,163,248,0.7)] to-[rgba(91,163,248,0.3)] hover:opacity-80 transition-opacity" 
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2.5 mt-3.5 flex-wrap">
                <div className="py-2 px-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full text-[12px] font-medium text-[rgba(255,255,255,0.6)] flex items-center gap-1.5">
                  <strong className="text-[rgba(255,255,255,0.9)]">BLGF</strong> Certified
                </div>
                <div className="py-2 px-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full text-[12px] font-medium text-[rgba(255,255,255,0.6)] flex items-center gap-1.5">
                  <strong className="text-[rgba(255,255,255,0.9)]">SEC</strong> Compliant
                </div>
                <div className="py-2 px-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full text-[12px] font-medium text-[rgba(255,255,255,0.6)] flex items-center gap-1.5">
                  <strong className="text-[rgba(255,255,255,0.9)]">COA</strong> Integrated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGOS --- */}
      <div className="py-9 px-12 bg-white border-b border-[rgba(30,58,138,0.12)]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-12 flex-wrap">
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7A99] whitespace-nowrap shrink-0">Regulatory Framework</span>
          <div className="w-px h-6 bg-[rgba(30,58,138,0.12)] shrink-0 hidden sm:block"></div>
          <div className="flex items-center gap-11 flex-wrap">
            {['SEC Philippines', 'BLGF — DOF', 'BSP', 'COA', 'PDEx', 'RA 7160', 'RA 9184'].map(item => (
              <span key={item} className="text-[13px] font-semibold text-[rgba(30,58,138,0.35)] tracking-wide whitespace-nowrap uppercase">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* --- PROBLEM --- */}
      <section className="py-25 px-12 bg-white" id="problem">
        <div className="max-w-[1200px] mx-auto">
          <div className="section-eyebrow">The Opportunity</div>
          <h2 className="section-headline">1,700 LGUs.<br />Almost none have issued a bond.</h2>
          <p className="section-sub">The Philippines has PHP 1.08 trillion in devolved NTA. The infrastructure backlog is real. The borrowing capacity exists. What's missing is the rails to get there.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl border border-[rgba(30,58,138,0.12)] overflow-hidden">
              {[
                { num: '1,', span: '700', label: 'Philippine LGUs eligible to issue bonds' },
                { num: '', span: '0', label: 'Active LGU bonds on PDEx today' },
                { num: 'PHP', span: '1.08T', label: 'Total NTA allocated post-Mandanas ruling' },
                { num: '', span: '0', label: 'LGU bond defaults on record since 1999' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-8 ${idx % 2 === 0 ? 'bg-[#F0F4FA]' : 'bg-white'}`}>
                  <div className="font-['DM_Serif_Display',serif] text-[42px] text-[#02084B] leading-none mb-2 tracking-[-0.02em]">
                    {stat.num}<span className="text-[#5BA3F8]">{stat.span}</span>
                  </div>
                  <div className="text-[13px] font-medium text-[#6B7A99] leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-7">
              {[
                { icon: '⚙️', title: 'No digital infrastructure exists', body: 'LGU bonds require BLGF certification, COA coordination, Sanggunian ordinances, SEC filing — all managed manually today with no unified platform.' },
                { icon: '📋', title: 'No listing guidelines at SEC or PDEx', body: 'There is no LGU bond category on PDEx. No standardized disclosure framework exists. The ADB identified this gap in 2023. Bondfy closes it.' },
                { icon: '🌏', title: 'OFWs cannot invest in home city bonds', body: '10 million OFWs send USD 34 billion home annually. None of that capital can today be directed into a formal hometown infrastructure bond. Bondfy enables it.' }
              ].map((point, idx) => (
                <Reveal key={idx} delay={idx * 100} className="flex gap-4.5 items-start pb-7 border-b border-[rgba(30,58,138,0.12)] last:border-none last:pb-0">
                  <div className="w-10 h-10 shrink-0 bg-[#F0F4FA] rounded-xl border border-[rgba(30,58,138,0.12)] flex items-center justify-center text-lg">{point.icon}</div>
                  <div>
                    <div className="text-[15px] font-semibold text-[#02084B] mb-1.5">{point.title}</div>
                    <div className="text-[14px] leading-relaxed text-[#6B7A99]">{point.body}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PLATFORM --- */}
      <section className="py-25 px-12 bg-[#F0F4FA]" id="platform">
        <div className="max-w-[1200px] mx-auto">
          <div className="section-eyebrow">The Platform</div>
          <h2 className="section-headline">End-to-end bond infrastructure,<br />built for Philippine compliance.</h2>
          <p className="section-sub">Bondfy is not a lender, a broker-dealer, or a blockchain project. It is the compliance automation and distribution infrastructure that makes LGU bond issuance viable at scale.</p>

          <div className="flex gap-1 my-12 bg-white border border-[rgba(30,58,138,0.12)] rounded-xl p-1 max-w-[600px]">
            {['Issuance', 'Compliance', 'Distribution', 'Post-Issuance'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 px-4 text-[13px] font-medium rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === tab ? 'bg-[#02084B] text-white font-semibold' : 'text-[#6B7A99] bg-none'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon="📄" title="Bond Ordinance Workflow" body="Guided template system for Sanggunian ordinance drafting, public hearing documentation, and LCE approval tracking — aligned with RA 7160 requirements." tag="RA 7160" />
            <FeatureCard icon="🏦" title="BLGF Certification Engine" body="Automated debt service ceiling calculation, borrowing capacity modeling, and CNDSCBC application documentation. Certified within 60 days or less." tag="DOF / BLGF" delay={100} />
            <FeatureCard icon="🔍" title="Independent Audit Coordination" body="Manages the parallel private CPA audit process alongside the COA audit — producing investor-grade financial statements in the format SEC requires." tag="COA / SEC" delay={200} />
            <FeatureCard icon="📡" title="Investor Distribution Network" body="Pre-qualified institutional investor database connecting LGU bonds to Landbank, DBP, insurance companies, and broker-dealer API partners for retail access." tag="Distribution" delay={300} />
            <FeatureCard icon="🌐" title="Public Transparency Portal" body="Real-time dashboard of bond proceeds, project implementation milestones, and coupon schedules — accessible to bondholders, COA auditors, and the public." tag="Transparency" delay={400} />
            <FeatureCard icon="⚡" title="Coupon Management System" body="Automated bondholder register, coupon payment calculations, and Trustee Bank coordination for the full bond tenor — zero manual reconciliation required." tag="Post-Issuance" delay={300} />
          </div>
        </div>
      </section>

      {/* Rest of sections continue similarly... */}
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .section-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5BA3F8;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-eyebrow::before {
          content: '';
          display: block;
          width: 20px;
          height: 2px;
          background: #5BA3F8;
        }
        .section-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #02084B;
          margin-bottom: 20px;
        }
        .section-sub {
          font-size: 17px;
          line-height: 1.65;
          color: #6B7A99;
          max-width: 520px;
        }
        
        @media (min-width: 768px) {
          .py-25 { padding-top: 100px; padding-bottom: 100px; }
          .px-12 { padding-left: 48px; padding-right: 48px; }
          .pt-30 { padding-top: 120px; }
        }
        .py-25 { padding-top: 60px; padding-bottom: 60px; }
        .px-12 { padding-left: 24px; padding-right: 24px; }
        .pt-30 { padding-top: 100px; }
        
        .transition-all { transition-property: all; }
        .duration-600 { transition-duration: 600ms; }
        .ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        .translate-y-6 { transform: translateY(24px); }
        .translate-y-0 { transform: translateY(0px); }
      `}</style>
    </div>
  );
}

// FeatureCard component
function FeatureCard({ icon, title, body, tag, delay = 0 }: { icon: string; title: string; body: string; tag: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white border border-[rgba(30,58,138,0.12)] rounded-2xl p-7 hover:border-[rgba(91,163,248,0.4)] hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-11 h-11 bg-[#F0F4FA] rounded-xl border border-[rgba(30,58,138,0.12)] flex items-center justify-center text-xl mb-4">
          {icon}
        </div>
        <div className="text-[15px] font-semibold text-[#02084B] mb-2">{title}</div>
        <div className="text-[13px] leading-relaxed text-[#6B7A99]">{body}</div>
        <span className="inline-block mt-3.5 py-0.5 px-2.5 bg-[rgba(91,163,248,0.1)] rounded-full text-[11px] font-semibold text-[#1E3A8A] tracking-wide">
          {tag}
        </span>
      </div>
    </Reveal>
  );
}
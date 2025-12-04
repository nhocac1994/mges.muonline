'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventCountdown from '@/components/EventCountdown';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import AnimatedSection from '@/components/AnimatedSection';
import MultiTypewriter from '@/components/MultiTypewriter';
import siteConfig from '@/config/site.config.json';

// Logo Section Component - Đơn giản hóa
const LogoSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
    setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  if (!isMounted) {
  return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-[60vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[60vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw] max-w-3xl max-h-3xl mx-auto">
          <Image 
            src="/MU-DAUTRUONG.PNG" 
            alt={`${siteConfig.serverName} Logo`} 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`relative ${isMobile ? 'w-[85vw] h-[85vw]' : 'w-[60vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[60vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw]'} max-w-3xl max-h-3xl mx-auto`}>
        <Image
          src="/MU-DAUTRUONG.PNG" 
          alt="MuDauTruongSS1.net Logo" 
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};



export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect mobile
    if (typeof window !== 'undefined') {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Throttle scroll handler để tối ưu performance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const news = [
    {
      title: 'HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1',
      date: '14/09/2025',
      type: 'Notice',
      link: '/news/guide'
    },
    {
      title: 'CÁC SỰ KIỆN TRONG GAME',
      date: '07/09/2025',
      type: 'Event',
      link: '/news/events'
    },
    {
      title: 'LỘ TRÌNH PHÁT TRIỂN SERVER',
      date: '07/09/2025',
      type: 'Update',
      link: '/news/roadmap'
    },
    {
      title: 'THÔNG BÁO MỞ SERVER',
      date: '07/09/2025',
      type: 'Notice',
      link: '/news/opening'
    },
    {
      title: 'UPDATE SERVER',
      date: '27/08/2025',
      type: 'Update',
      link: '/news/update'
    }
  ];


  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": `${siteConfig.serverName} - ${siteConfig.gameTitle}`,
    "description": siteConfig.metaDescription,
    "applicationCategory": "Game",
    "operatingSystem": "Windows",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "genre": ["MMORPG", "Action", "Role-Playing"],
    "gamePlatform": "PC",
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.serverName,
      "url": siteConfig.websiteUrl
    },
    "screenshot": [
      `${siteConfig.websiteUrl}${siteConfig.bannerImage}`,
      `${siteConfig.websiteUrl}/logoweb.jpg`,
      `${siteConfig.websiteUrl}/muonline-panael.jpg`
    ]
  };


  return (
    <>
    <div className="min-h-screen relative overflow-x-hidden" style={{
      fontFamily: 'Roboto, sans-serif',
      margin: 0,
      padding: 0,
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      overflowY: isMobile ? 'visible' : 'auto',
      height: isMobile ? 'auto' : undefined,
      position: 'relative'
    }}>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      
      {/* Background Image - Cho cả Mobile và Desktop */}
      {isClient && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat mu-retro-texture"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/panael-mu.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll',
            zIndex: 0,
            pointerEvents: 'none',
            margin: 0,
            padding: 0,
            filter: 'brightness(1.3) contrast(1.1)'
          }}
        >
          {/* Retro Overlay - Giảm độ tối để sáng hơn */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.03) 0%, transparent 50%), linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10" style={{ paddingTop: isClient && isMobile ? '80px' : '92px' }}>
        {/* Background for main content */}
        <div className="fixed inset-0 -z-10 bg-black/20"></div>
        
        {/* Logo Section - Đơn giản hóa */}
        <section className="min-h-screen flex items-center justify-center relative py-16">
            <div className="relative z-10">
              <LogoSection />
            </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8 relative z-10">
          {/* Content Grid */}
          <section className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-12">
            {/* Game Events Section */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-14">
                  <h3 className="text-xl sm:text-2xl mu-retro-title">Sự Kiện</h3>
                </div>
                <div style={{ marginTop: '50px' }}>
                <EventCountdown />
                </div>
              </div>
              </div>
            </AnimatedSection>

            {/* News Section */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="space-y-4 sm:space-y-6">
              <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-14">
                    <h3 className="text-xl sm:text-2xl mu-retro-title">Bản Tin Mới</h3>
                  </div>
                  <div style={{ marginTop: '50px' }}>
                  <div className="space-y-3 sm:space-y-5">
                    {news.map((item, index) => (
                      <div key={index} className="p-3 sm:p-6 group" style={{ backgroundColor: 'transparent' }}>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className={`mu-retro-badge text-[10px] sm:text-xs ${
                            item.type === 'Notice' ? 'mu-retro-badge-notice' : 
                            item.type === 'Event' ? 'mu-retro-badge-event' : ''
                          }`}>{item.type}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="mu-text-gold font-semibold mb-1 text-xs sm:text-sm">
                              <Link href={item.link} className="mu-retro-link">
                                {item.title}
                              </Link>
                            </h4>
                            <span className="text-gray-400 text-[10px] sm:text-xs">{item.date}</span>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Join Banner */}
              <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10 text-center">
                  <h2 className="text-xl sm:text-2xl mu-retro-title mb-4 sm:mb-8">THAM GIA NGAY</h2>
                  <div style={{ marginTop: '100px' }}>
                    <Link href="/register" className="mu-retro-btn-classic inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3">
                      Đăng Ký Ngay
                    </Link>
                  </div>
                </div>
              </div>
              </div>
            </AnimatedSection>
          </section>


          {/* Download Section */}
          <section className="py-8 sm:py-16">
            <div className="container mx-auto px-2 sm:px-4">
              <div className="text-center mb-6 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl mu-retro-title mb-2 sm:mb-4">
                    TẢI GAME NGAY
                </h2>
                <p className="text-sm sm:text-xl mu-text-orange">Tải client và launcher để bắt đầu hành trình Mu Online</p>
              </div>
              <div className="mu-retro-divider"></div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center mu-retro-card p-4 sm:p-10">
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl mu-retro-title-small mb-4 sm:mb-6">MediaFire</h3>
                    <div style={{ marginTop: '100px' }}>
                    <a 
                      href={siteConfig.downloadLinks.mediafire} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mu-retro-btn inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                    >
                      📥 Tải Client {siteConfig.downloadLinks.clientVersion}
                    </a>
                    </div>
                  </div>
                </div>
                <div className="text-center mu-retro-card p-4 sm:p-10">
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl mu-retro-title-small mb-4 sm:mb-6">MEGA</h3>
                    <div style={{ marginTop: '100px' }}>
                    <a 
                      href={siteConfig.downloadLinks.mega} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mu-retro-btn inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                    >
                      📥 Tải Client {siteConfig.downloadLinks.clientVersion}
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Game Features */}
          <section className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="mu-retro-card p-3 sm:p-5 text-center">
                <div className="relative z-10">
                  <div className="text-2xl sm:text-4xl mb-3 sm:mb-6">⚔️</div>
                  <div style={{ marginTop: '50px' }}>
                  <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">PvP Combat</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Chiến đấu với người chơi khác trong các cuộc chiến gay cấn</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="mu-retro-card p-3 sm:p-5 text-center">
                <div className="relative z-10">
                  <div className="text-2xl sm:text-4xl mb-3 sm:mb-6">🏰</div>
                  <div style={{ marginTop: '50px' }}>
                  <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Guild System</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Tham gia guild và chiến đấu cùng đồng đội hỗ trợ nhau trong các cuộc chiến</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.3}>
              <div className="mu-retro-card p-3 sm:p-5 text-center">
                <div className="relative z-10">
                  <div className="text-2xl sm:text-4xl mb-3 sm:mb-6">🎯</div>
                  <div style={{ marginTop: '50px' }}>
                  <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Events</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Tham gia các sự kiện đặc biệt và nhận phần thưởng</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

        </div>
      </main>


      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 mu-retro-bg"></div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
    </>
  );
}
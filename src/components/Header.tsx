'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import siteConfig from '@/config/site.config.json';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    // Trên trang chủ: chỉ hiện khi scroll, trên trang khác: luôn hiện
    if (!isHomePage) {
      setIsScrolled(true);
    } else {
      // Kiểm tra scroll position ban đầu
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Đóng mobile menu khi route thay đổi
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Top Header - Hidden on homepage initially, always visible on other pages */}
      <motion.div 
        className="fixed top-0 left-0 right-0 py-1.5 border-b-2 border-[#FFD700] z-[100]"
        style={{
          background: 'linear-gradient(135deg, rgba(50, 40, 20, 0.98) 0%, rgba(70, 55, 25, 1) 50%, rgba(50, 40, 20, 0.98) 100%)',
          boxShadow: '0 2px 15px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.3), inset 0 -1px 0 rgba(255, 215, 0, 0.1)',
          borderColor: '#FFD700',
          borderBottomWidth: '2px',
          height: '36px',
          minHeight: '36px',
          maxHeight: '36px'
        }}
        initial={false}
        animate={{ 
          y: isClient && (isScrolled || !isHomePage) ? 0 : -100, 
          opacity: isClient && (isScrolled || !isHomePage) ? 1 : 0,
          pointerEvents: isClient && (isScrolled || !isHomePage) ? 'auto' : 'none'
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center h-full">
          <div className="mu-text-gold text-xs font-medium whitespace-nowrap">🟢 Server Online</div>
          <div className="flex gap-2 items-center">
            <Link href="/register" className="mu-retro-link text-xs font-medium px-2 py-0.5 whitespace-nowrap">
              ĐĂNG KÝ
            </Link>
            <span className="mu-text-gold text-xs">|</span>
            <Link href="/login" className="mu-retro-link text-xs font-medium px-2 py-0.5 whitespace-nowrap">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Navigation - Hidden on homepage initially, always visible on other pages */}
      <motion.nav 
        className="fixed left-0 right-0 py-2 border-b-2 border-[#FFD700] z-[100]"
        style={{
          top: '36px',
          background: 'linear-gradient(135deg, rgba(50, 40, 20, 0.98) 0%, rgba(70, 55, 25, 1) 50%, rgba(50, 40, 20, 0.98) 100%)',
          boxShadow: '0 2px 15px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.3), inset 0 -1px 0 rgba(255, 215, 0, 0.1)',
          borderColor: '#FFD700',
          borderBottomWidth: '2px',
          height: '56px',
          minHeight: '56px',
          maxHeight: '56px'
        }}
        initial={false}
        animate={{ 
          y: isClient && (isScrolled || !isHomePage) ? 0 : -100, 
          opacity: isClient && (isScrolled || !isHomePage) ? 1 : 0,
          pointerEvents: isClient && (isScrolled || !isHomePage) ? 'auto' : 'none'
        }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-5 h-full flex items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center w-full">
            <div className="flex gap-6 justify-center">
              <Link 
                href="/" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                TRANG CHỦ
              </Link>
              <Link 
                href="/info" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/info') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/info') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/info')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/info')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                THÔNG TIN
              </Link>
              <Link 
                href="/download" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/download') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/download') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/download')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/download')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                TẢI GAME
              </Link>
              <Link 
                href="/donate" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/donate') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/donate') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/donate')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/donate')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                QUYÊN GÓP
              </Link>
              <Link 
                href="/news" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/news') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/news') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/news')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/news')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                TIN TỨC
              </Link>
              <Link 
                href="/rankings" 
                className={`mu-retro-title-small transition-all px-3 py-1 rounded text-sm ${
                  isActive('/rankings') ? 'mu-text-gold' : 'text-white'
                }`}
                style={{
                  textShadow: isActive('/rankings') ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/rankings')) {
                    e.currentTarget.style.color = '#FFA500';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 165, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/rankings')) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                XẾP HẠNG
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/logo-muty.PNG" 
                  alt={`${siteConfig.serverName} - ${siteConfig.gameTitle} Mobile Logo`} 
                  width={40}
                  height={16}
                  className="w-8 h-auto"
                />
                <span className="mu-text-gold font-bold text-xs">{siteConfig.serverName}</span>
              </div>
              
              <button 
                className="mu-text-gold p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu */}
            <div className={`transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="py-4 space-y-3 border-t border-[#FFD700] mt-3">
                <Link 
                  href="/" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  TRANG CHỦ
                </Link>
                <Link 
                  href="/info" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/info') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  THÔNG TIN
                </Link>
                <Link 
                  href="/download" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/download') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  TẢI GAME
                </Link>
                <Link 
                  href="/donate" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/donate') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  QUYÊN GÓP
                </Link>
                <Link 
                  href="/news" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/news') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  TIN TỨC
                </Link>
                <Link 
                  href="/rankings" 
                  className={`block transition-colors py-2 mu-retro-title-small ${
                    isActive('/rankings') ? 'mu-text-gold' : 'text-white'
                  }`}
                >
                  XẾP HẠNG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}


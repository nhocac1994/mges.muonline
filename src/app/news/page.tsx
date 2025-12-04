'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NetworkOverlay from '@/components/NetworkOverlay';
import siteConfig from '@/config/site.config.json';

export default function News() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Background Image - Desktop Only */}
      {isClient && (
        <>
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
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
          
          {/* Mobile Background - Simple gradient */}
          <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        </>
      )}
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">
          {/* Page Header */}
      <section className="py-8 sm:py-16 bg-black/30">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-4">📰 TIN TỨC MỚI NHẤT</h1>
          <p className="text-sm sm:text-xl text-blue-300">Cập nhật thông tin mới nhất về server</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm tin tức..." 
                className="w-full bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 sm:px-6 py-2 sm:py-4 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-1 sm:right-2 top-1 sm:top-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm">
                🔍 Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Main News */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-8">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-8 border border-blue-500/30">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-semibold">HOT</span>
                  <span className="text-gray-400 text-xs sm:text-base">22/09/2024</span>
                </div>
                <h2 className="text-base sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                  HƯỚNG DẪN CHƠI {siteConfig.serverName.toUpperCase()} - {siteConfig.serverVersion.toUpperCase()}
                </h2>
                <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-base">
                  Hướng dẫn chi tiết cách chơi game {siteConfig.gameTitle}, từ việc tạo nhân vật đến các tính năng nâng cao. 
                  Tìm hiểu về các class, kỹ năng, và cách phát triển nhân vật hiệu quả nhất.
                </p>
                <Link href="/news/guide" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold text-xs sm:text-base">
                  Đọc thêm →
                </Link>
              </div>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-8 border border-green-500/30">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="bg-green-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-semibold">EVENT</span>
                  <span className="text-gray-400 text-xs sm:text-base">21/09/2024</span>
                </div>
                <h2 className="text-base sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                  CÁC SỰ KIỆN TRONG GAME
                </h2>
                <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-base">
                  Thông tin về các sự kiện đặc biệt trong game như Double EXP, Drop Rate Event, 
                  PK Tournament và nhiều sự kiện thú vị khác đang diễn ra.
                </p>
                <Link href="/news/events" className="text-green-400 hover:text-green-300 transition-colors font-semibold text-xs sm:text-base">
                  Đọc thêm →
                </Link>
              </div>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-8 border border-purple-500/30">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="bg-purple-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-semibold">UPDATE</span>
                  <span className="text-gray-400 text-xs sm:text-base">20/09/2024</span>
                </div>
                <h2 className="text-base sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                  LỘ TRÌNH PHÁT TRIỂN SERVER
                </h2>
                <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-base">
                  Kế hoạch phát triển server trong tương lai, bao gồm các tính năng mới, 
                  cập nhật game và cải thiện trải nghiệm người chơi.
                </p>
                <Link href="/news/roadmap" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold text-xs sm:text-base">
                  Đọc thêm →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-8">
              {/* Recent News */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-blue-500/30">
                <h3 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6">📋 TIN TỨC GẦN ĐÂY</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="border-b border-gray-700 pb-3 sm:pb-4">
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">THÔNG BÁO MỞ SERVER</h4>
                    <p className="text-gray-400 text-[10px] sm:text-sm">19/09/2024</p>
                  </div>
                  <div className="border-b border-gray-700 pb-3 sm:pb-4">
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">CẬP NHẬT PATCH 1.1</h4>
                    <p className="text-gray-400 text-[10px] sm:text-sm">18/09/2024</p>
                  </div>
                  <div className="border-b border-gray-700 pb-3 sm:pb-4">
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-base">SỰ KIỆN DOUBLE EXP</h4>
                    <p className="text-gray-400 text-[10px] sm:text-sm">17/09/2024</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-blue-500/30">
                <h3 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6">🏷️ DANH MỤC</h3>
                <div className="space-y-2 sm:space-y-3">
                  <Link href="/news/guide" className="block text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-base">
                    📖 Hướng Dẫn
                  </Link>
                  <Link href="/news/events" className="block text-green-400 hover:text-green-300 transition-colors text-xs sm:text-base">
                    🎮 Sự Kiện
                  </Link>
                  <Link href="/news/roadmap" className="block text-purple-400 hover:text-purple-300 transition-colors text-xs sm:text-base">
                    🚀 Cập Nhật
                  </Link>
                  <Link href="/news/opening" className="block text-red-400 hover:text-red-300 transition-colors text-xs sm:text-base">
                    📢 Thông Báo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </main>
      </div>
    </div>
  );
}

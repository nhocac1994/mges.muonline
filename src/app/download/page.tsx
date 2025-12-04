'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function Download() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden mu-retro-bg-texture" style={{
      fontFamily: 'Cinzel, serif'
    }}>
      {/* Background Image - Cho cả Mobile và Desktop */}
      {isClient && (
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
      )}
      
      {/* Background for main content */}
      <div className="fixed inset-0 -z-10 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10" style={{ paddingTop: '92px' }}>
      {/* Main Content */}
      <main className="relative z-10 py-8">

      {/* Page Header */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-5xl mu-retro-title mb-2 sm:mb-4">TẢI GAME</h1>
          <p className="text-sm sm:text-xl mu-text-gold">{siteConfig.serverName} - Client và Launcher</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-8 sm:py-16">
          {/* Alternative Download Links */}
          <div className="container mx-auto px-2 sm:px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                  <div className="text-center mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl mu-retro-title-small mb-4 sm:mb-6">MediaFire</h3>
                      <div style={{ marginTop: '60px' }}>
                        <a 
                          href={siteConfig.downloadLinks.mediafire} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mu-retro-btn-classic inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                        >
                          📥 Tải Client {siteConfig.downloadLinks.clientVersion}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl mu-retro-title-small mb-4 sm:mb-6">MEGA</h3>
                      <div style={{ marginTop: '60px' }}>
                        <a 
                          href={siteConfig.downloadLinks.mega} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mu-retro-btn-classic inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                        >
                          📥 Tải Client {siteConfig.downloadLinks.clientVersion}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>

      {/* System Requirements */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-14">
            <h2 className="text-2xl sm:text-5xl mu-retro-title mb-2 sm:mb-4">YÊU CẦU HỆ THỐNG</h2>
            <p className="text-sm sm:text-xl text-gray-300">Thông tin cấu hình máy tính cần thiết</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="mu-retro-card text-center" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl mu-retro-title-small mb-4 sm:mb-8">Tối Thiểu</h3>
                  <div className="space-y-3 sm:space-y-5" style={{ marginTop: '50px' }}>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">OS:</span>
                      <span className="text-white text-xs sm:text-lg">Windows 7/8/10/11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">CPU:</span>
                      <span className="text-white text-xs sm:text-lg">Intel Core 2 Duo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">RAM:</span>
                      <span className="text-white text-xs sm:text-lg">2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">GPU:</span>
                      <span className="text-white text-xs sm:text-lg">DirectX 9.0c</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">Storage:</span>
                      <span className="text-white text-xs sm:text-lg">5 GB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mu-retro-card text-center" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl mu-retro-title-small mb-4">Khuyến Nghị</h3>
                  <div className="space-y-3 sm:space-y-5" style={{ marginTop: '50px' }}>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">OS:</span>
                      <span className="text-white text-xs sm:text-lg">Windows 10/11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">CPU:</span>
                      <span className="text-white text-xs sm:text-lg">Intel Core i5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">RAM:</span>
                      <span className="text-white text-xs sm:text-lg">8 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">GPU:</span>
                      <span className="text-white text-xs sm:text-lg">DirectX 11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs sm:text-lg">Storage:</span>
                      <span className="text-white text-xs sm:text-lg">10 GB SSD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-5xl mu-retro-title mb-4">HƯỚNG DẪN CÀI ĐẶT</h2>
            <p className="text-xl text-gray-300">Các bước cài đặt game đơn giản</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="mu-retro-card" style={{ padding: '56px 56px 56px 56px', paddingTop: '40px' }}>
              <div className="relative z-10">
                <div className="space-y-6" style={{ marginTop: '30px' }}>
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)', flexShrink: 0 }}>1</div>
                    <div>
                      <h3 className="text-xl mu-retro-title-small mb-2">Tải xuống Client</h3>
                      <p className="text-gray-300 text-lg">Tải xuống file client từ link phía trên</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)', flexShrink: 0 }}>2</div>
                    <div>
                      <h3 className="text-xl mu-retro-title-small mb-2">Giải nén file</h3>
                      <p className="text-gray-300 text-lg">Giải nén file .7z bằng WinRAR hoặc 7-Zip vào thư mục bạn muốn</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)', flexShrink: 0 }}>3</div>
                    <div>
                      <h3 className="text-xl mu-retro-title-small mb-2">Chạy Launcher</h3>
                      <p className="text-gray-300 text-lg">Chạy file launcher.exe để tự động cập nhật</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)', flexShrink: 0 }}>4</div>
                    <div>
                      <h3 className="text-xl mu-retro-title-small mb-2">Đăng nhập và chơi</h3>
                      <p className="text-gray-300 text-lg">Sử dụng tài khoản đã đăng ký để vào game</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </main>
      </div>
    </div>
  );
}

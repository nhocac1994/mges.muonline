'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function NewsOpening() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
            {/* Retro Overlay */}
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
      <div className="relative z-10" style={{ paddingTop: '92px' }}>
        {/* Breadcrumb */}
        <section className="py-4 bg-black/30">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm">
              <Link href="/" className="text-blue-400 hover:text-blue-300">Trang Chủ</Link>
              <span className="text-gray-400">/</span>
              <Link href="/news" className="text-blue-400 hover:text-blue-300">Tin Tức</Link>
              <span className="text-gray-400">/</span>
              <span className="text-white">Thông Báo</span>
            </nav>
          </div>
        </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">NOTICE</span>
                <span className="text-gray-400">19/09/2024</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                THÔNG BÁO MỞ SERVER
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-red-500/30">
                  <h2 className="text-2xl font-bold text-red-400 mb-4">🚀 CHÍNH THỨC MỞ SERVER</h2>
                  <p className="text-gray-300 mb-4">
                    Chúng tôi vui mừng thông báo rằng server {siteConfig.serverName} đã chính thức mở cửa!
                  </p>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">25/09/2024</div>
                    <div className="text-xl text-blue-300">20:00 (GMT+7)</div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎉 Sự Kiện Khai Trương</h2>
                <p className="text-gray-300 mb-6">
                  Để chào mừng server mở cửa, chúng tôi sẽ tổ chức nhiều sự kiện đặc biệt:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🎁 Quà Tặng Khai Trương</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• 1,000 Zen cho tài khoản mới</li>
                      <li>• Set items cấp 1</li>
                      <li>• 3 ngày VIP miễn phí</li>
                      <li>• Pet hỗ trợ leveling</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">⚡ Event Đặc Biệt</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Triple EXP trong 7 ngày đầu</li>
                      <li>• Double Drop Rate</li>
                      <li>• Free reset không giới hạn</li>
                      <li>• PK không mất items</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">📋 Hướng Dẫn Bắt Đầu</h2>
                <p className="text-gray-300 mb-6">
                  Để bắt đầu chơi trên server mới, hãy làm theo các bước sau:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tải Game</h3>
                        <p className="text-gray-300">Tải xuống client và launcher từ trang download</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Đăng Ký Tài Khoản</h3>
                        <p className="text-gray-300">Tạo tài khoản mới trên website</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tạo Nhân Vật</h3>
                        <p className="text-gray-300">Chọn class và tạo nhân vật đầu tiên</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Bắt Đầu Chơi</h3>
                        <p className="text-gray-300">Tham gia vào thế giới Mu Online!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🏆 Giải Đấu Khai Trương</h2>
                <p className="text-gray-300 mb-6">
                  Để chào mừng server mở cửa, chúng tôi sẽ tổ chức giải đấu đặc biệt:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">🥇 Giải Đấu Level Race</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: 25/09 - 02/10/2024</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Thi đua level nhanh nhất</li>
                        <li>• Phần thưởng lớn cho top 10</li>
                        <li>• Không giới hạn reset</li>
                        <li>• Hỗ trợ từ admin</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🥇 Hạng 1: 50,000 Zen + Wing</li>
                        <li>• 🥈 Hạng 2: 30,000 Zen + Ring</li>
                        <li>• 🥉 Hạng 3: 20,000 Zen + Pendant</li>
                        <li>• 🎁 Top 10: 10,000 Zen</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">📞 Hỗ Trợ & Liên Hệ</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-lg font-bold text-blue-400 mb-3">💬 Discord</h3>
                    <p className="text-gray-300 text-sm">Tham gia Discord để nhận hỗ trợ 24/7</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-lg font-bold text-green-400 mb-3">📱 Zalo</h3>
                    <p className="text-gray-300 text-sm">Liên hệ qua Zalo để được hỗ trợ nhanh</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">📧 Email</h3>
                    <p className="text-gray-300 text-sm">Gửi email để được hỗ trợ chuyên nghiệp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}

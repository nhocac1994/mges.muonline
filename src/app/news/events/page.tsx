'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsEvents() {
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
              <span className="text-white">Sự Kiện</span>
            </nav>
          </div>
        </section>

        {/* Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">EVENT</span>
                  <span className="text-gray-400">21/09/2024</span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-6">
                  CÁC SỰ KIỆN TRONG GAME
                </h1>
                
                <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🎮 Sự Kiện Hàng Ngày</h2>
                <p className="text-gray-300 mb-6">
                  Mỗi ngày server sẽ có các sự kiện đặc biệt để người chơi có thể nhận được nhiều phần thưởng hơn:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-400 mb-4">⚡ Double EXP Event</h3>
                    <p className="text-gray-300 mb-4">Thời gian: 20:00 - 22:00 hàng ngày</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Nhận gấp đôi kinh nghiệm</li>
                      <li>• Áp dụng cho tất cả map</li>
                      <li>• Không giới hạn level</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">💎 Drop Rate Event</h3>
                    <p className="text-gray-300 mb-4">Thời gian: 14:00 - 16:00 hàng ngày</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Tăng tỷ lệ rơi đồ hiếm</li>
                      <li>• Áp dụng cho tất cả quái vật</li>
                      <li>• Cơ hội nhận set items</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🏆 Sự Kiện Hàng Tuần</h2>
                <p className="text-gray-300 mb-6">
                  Các sự kiện đặc biệt diễn ra vào cuối tuần với phần thưởng lớn:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">⚔️ PK Tournament</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: Chủ nhật 20:00</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Giải đấu PK 1vs1</li>
                        <li>• Phần thưởng: Zen + Items</li>
                        <li>• Đăng ký: 19:00 - 19:30</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🥇 Hạng 1: 10,000 Zen + Wing</li>
                        <li>• 🥈 Hạng 2: 5,000 Zen + Ring</li>
                        <li>• 🥉 Hạng 3: 2,000 Zen + Pendant</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">🏰 Guild War</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: Thứ 7 21:00</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Chiến tranh giữa các guild</li>
                        <li>• Chiếm lấy Castle Siege</li>
                        <li>• Phần thưởng guild lớn</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng Guild:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🏆 Guild thắng: 50,000 Zen</li>
                        <li>• 🥈 Guild thua: 10,000 Zen</li>
                        <li>• 🎁 Bonus items cho tất cả</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎉 Sự Kiện Đặc Biệt</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-400 mb-3">🎂 Birthday Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện sinh nhật server với nhiều phần thưởng đặc biệt</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">🎃 Halloween Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện Halloween với trang phục và items đặc biệt</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">🎄 Christmas Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện Giáng sinh với quà tặng và decorations</p>
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

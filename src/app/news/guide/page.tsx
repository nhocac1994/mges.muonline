'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function NewsGuide() {
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
              <span className="text-white">Hướng Dẫn</span>
            </nav>
          </div>
        </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">HOT</span>
                <span className="text-gray-400">22/09/2024</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🎮 Tạo Nhân Vật</h2>
                <p className="text-gray-300 mb-6">
                  Đầu tiên, bạn cần tạo một tài khoản và nhân vật. Có 3 class chính trong {siteConfig.gameTitle}:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">⚔️ Dark Knight</h3>
                    <p className="text-gray-300 mb-4">Chiến binh mạnh mẽ với khả năng chiến đấu cận chiến</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Sức mạnh cao</li>
                      <li>• Khả năng chịu đòn tốt</li>
                      <li>• Phù hợp với người mới</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">🏹 Dark Wizard</h3>
                    <p className="text-gray-300 mb-4">Pháp sư với khả năng tấn công từ xa</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Sát thương cao</li>
                      <li>• Tấn công từ xa</li>
                      <li>• Cần kỹ năng cao</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">🔮 Fairy Elf</h3>
                    <p className="text-gray-300 mb-4">Tiên nữ với khả năng hỗ trợ và tấn công</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Khả năng hỗ trợ</li>
                      <li>• Tấn công linh hoạt</li>
                      <li>• Cân bằng tốt</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">📈 Phát Triển Nhân Vật</h2>
                <p className="text-gray-300 mb-6">
                  Sau khi tạo nhân vật, bạn cần phát triển nhân vật thông qua:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">⚡ Leveling</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Level 1-50:</strong> Tập trung vào việc giết quái vật cấp thấp</li>
                    <li>• <strong>Level 50-100:</strong> Tham gia các sự kiện EXP</li>
                    <li>• <strong>Level 100+:</strong> Tìm party để level hiệu quả</li>
                  </ul>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">💎 Equipment</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Weapon:</strong> Vũ khí chính để tăng sát thương</li>
                    <li>• <strong>Armor:</strong> Giáp để tăng khả năng phòng thủ</li>
                    <li>• <strong>Accessories:</strong> Trang sức để tăng stats</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎯 Tips & Tricks</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-lg font-bold text-green-400 mb-3">✅ Nên Làm</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Tham gia guild để có hỗ trợ</li>
                      <li>• Làm daily quests mỗi ngày</li>
                      <li>• Tham gia events để nhận rewards</li>
                      <li>• Upgrade equipment thường xuyên</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-400 mb-3">❌ Không Nên</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Bỏ qua việc upgrade equipment</li>
                      <li>• Chơi solo quá nhiều</li>
                      <li>• Bỏ qua các sự kiện</li>
                      <li>• Không tham gia guild</li>
                    </ul>
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

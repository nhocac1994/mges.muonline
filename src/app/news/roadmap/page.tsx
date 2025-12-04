'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function NewsRoadmap() {
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
              <span className="text-white">Lộ Trình</span>
            </nav>
          </div>
        </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">UPDATE</span>
                <span className="text-gray-400">20/09/2024</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                LỘ TRÌNH PHÁT TRIỂN SERVER
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🚀 Giai Đoạn 1: Khởi Động (Q4 2024)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn đầu tiên tập trung vào việc ổn định server và thu hút người chơi:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">✅ Đã Hoàn Thành</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• ✅ Khởi động server {siteConfig.serverVersion}</li>
                    <li>• ✅ Hệ thống đăng ký/đăng nhập</li>
                    <li>• ✅ Website chính thức</li>
                    <li>• ✅ Hệ thống anti-cheat cơ bản</li>
                  </ul>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">🔄 Đang Thực Hiện</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 🔄 Tối ưu hóa server performance</li>
                    <li>• 🔄 Thêm các sự kiện hàng ngày</li>
                    <li>• 🔄 Cải thiện hệ thống support</li>
                    <li>• 🔄 Phát triển mobile app</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎯 Giai Đoạn 2: Phát Triển (Q1 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn thứ hai tập trung vào việc thêm tính năng mới và cải thiện trải nghiệm:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🎮 Tính Năng Game</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Thêm class Summoner</li>
                      <li>• Hệ thống guild war nâng cao</li>
                      <li>• Thêm map mới</li>
                      <li>• Hệ thống quest tự động</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">💻 Tính Năng Website</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Hệ thống ranking online</li>
                      <li>• Forum cộng đồng</li>
                      <li>• Hệ thống vote server</li>
                      <li>• API cho mobile app</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🌟 Giai Đoạn 3: Mở Rộng (Q2 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn thứ ba tập trung vào việc mở rộng server và thêm tính năng cao cấp:
                </p>
                
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">🎪 Tính Năng Cao Cấp</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Hệ thống castle siege nâng cao</li>
                    <li>• Thêm class Rage Fighter</li>
                    <li>• Hệ thống pet và mount</li>
                    <li>• Thêm server PvP riêng</li>
                    <li>• Hệ thống tournament tự động</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🔮 Giai Đoạn 4: Tương Lai (Q3-Q4 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn cuối tập trung vào việc phát triển dài hạn và mở rộng cộng đồng:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">🌍 Mở Rộng</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Thêm server quốc tế</li>
                      <li>• Hệ thống cross-server</li>
                      <li>• Thêm ngôn ngữ</li>
                      <li>• Partnership với các server khác</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-xl font-bold text-red-400 mb-4">🚀 Công Nghệ</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Upgrade lên Season 2</li>
                      <li>• Hệ thống AI anti-cheat</li>
                      <li>• Cloud infrastructure</li>
                      <li>• Blockchain integration</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mt-8 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Thống Kê Mục Tiêu</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">1,000+</div>
                      <div className="text-gray-300">Người chơi online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
                      <div className="text-gray-300">Tài khoản đăng ký</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                      <div className="text-gray-300">Uptime server</div>
                    </div>
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

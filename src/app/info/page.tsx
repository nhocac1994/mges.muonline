'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import siteConfig from '@/config/site.config.json';

export default function Info() {
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
      <section className="py-8 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 text-center relative z-10">
          <motion.div 
            className="mb-4 sm:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-2xl sm:text-6xl mu-retro-title mb-2 sm:mb-4">
              THÔNG TIN SERVER
            </h1>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-base sm:text-2xl mu-text-gold mb-2 sm:mb-4">
                {siteConfig.serverName} - Server {siteConfig.gameTitle}
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-sm sm:text-lg text-gray-300">
                Thông tin chi tiết về server và các tính năng nổi bật
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </section>
      

      {/* Server Info */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-12">
            {/* Server Stats */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10" >
                <div className="text-center mb-6 sm:mb-14">
                  <div className="flex items-center justify-center mb-4">
                    <h2 className="text-xl sm:text-3xl mu-retro-title">THỐNG KÊ SERVER</h2>
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                <div className="space-y-3 sm:space-y-5">
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFD700] rounded-full animate-pulse flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Người Online:</span>
                    </div>
                    <span className="mu-text-gold font-bold text-lg sm:text-2xl">1,234</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFA500] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '0.5s', boxShadow: '0 0 6px rgba(255, 165, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Tổng Tài Khoản:</span>
                    </div>
                    <span className="mu-text-orange font-bold text-lg sm:text-2xl">5,678</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFD700] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '1s', boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Server Uptime:</span>
                    </div>
                    <span className="mu-text-gold font-bold text-lg sm:text-2xl">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFA500] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '1.5s', boxShadow: '0 0 6px rgba(255, 165, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Version:</span>
                    </div>
                    <span className="mu-text-orange font-bold text-lg sm:text-2xl">{siteConfig.serverVersion}</span>
                  </div>
                  </div>
                </div>
              </div>
              </div>
            </AnimatedSection>

            {/* Server Settings */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-14">
                  <div className="flex items-center justify-center mb-4">

                    <h2 className="text-xl sm:text-3xl mu-retro-title">CÀI ĐẶT SERVER</h2>
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                <div className="space-y-3 sm:space-y-5">
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFD700] rounded-full animate-pulse flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Exp Rate:</span>
                    </div>
                    <span className="mu-text-gold font-bold text-lg sm:text-2xl">{siteConfig.expRate}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFA500] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '0.5s', boxShadow: '0 0 6px rgba(255, 165, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Drop Rate:</span>
                    </div>
                    <span className="mu-text-orange font-bold text-lg sm:text-2xl">{siteConfig.dropRate}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFD700] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '1s', boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Max Level:</span>
                    </div>
                    <span className="mu-text-gold font-bold text-lg sm:text-2xl">{siteConfig.resetLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-5 px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FFA500] rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '1.5s', boxShadow: '0 0 6px rgba(255, 165, 0, 0.6)' }}></div>
                      <span className="text-gray-300 text-xs sm:text-base">Reset Level:</span>
                    </div>
                    <span className="mu-text-orange font-bold text-lg sm:text-2xl">{siteConfig.resetLevel}</span>
                  </div>
                </div>
                </div>
              </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Game Commands Section */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl mu-retro-title mb-2 sm:mb-4">
                CÁC LỆNH TRONG GAME
              </h2>
              <p className="text-sm sm:text-xl text-gray-300">
                Danh sách các lệnh hữu ích để chơi game hiệu quả
              </p>
            </div>

            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <div className="overflow-x-auto" style={{ marginTop: '10px' }}>
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="mu-text-gold font-bold py-3 sm:py-6 px-3 sm:px-6 text-base sm:text-xl text-center">Lệnh và Mô tả</th>
                      </tr>
                    </thead>
                    <div style={{ marginTop: '60px' }}>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono mu-text-gold text-sm sm:text-lg">/reset</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Reset your character</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono mu-text-gold text-sm sm:text-lg">/reset auto</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Auto Reset your character</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/nv</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Làm nhiệm vụ nhanh</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/pkclear</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Clear killer status</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/pickset [tên item]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cài đặt auto nhặt</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/pick</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Auto nhặt</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/pickclear</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Tắt Auto nhặt</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/post [message]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Gửi tin nhắn đến toàn server</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/readd</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Tẩy điểm</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/addstr [points]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cộng điểm sức mạnh</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/addagi [points]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cộng điểm nhanh nhẹn</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/addvit [points]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cộng điểm máu</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/addene [points]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cộng điểm năng lượng</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/addcmd [points]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Cộng điểm mệnh lệnh</td>
                      </tr>
                      <tr className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                        <td className="py-3 sm:py-6 px-3 sm:px-6 font-mono text-green-400 text-sm sm:text-lg">/thungdo [0-5]</td>
                        <td className="py-3 sm:py-6 px-3 sm:px-6 text-gray-300 text-sm sm:text-lg">Mở thùng đồ cá nhân từ 1 - 5</td>
                      </tr>
                    </tbody>
                    </div>
                  </table>
                </div>
                
                <div className="mt-6 sm:mt-10 p-3 sm:p-6" style={{ backgroundColor: 'transparent' }}>
                  <h3 className="text-base sm:text-xl mu-retro-title mb-3 sm:mb-5">💡 Lưu ý quan trọng:</h3>
                  <ul className="text-gray-300 space-y-2 sm:space-y-3 text-sm sm:text-lg">
                    <li>• Tất cả lệnh phải được nhập chính xác, phân biệt chữ hoa/thường</li>
                    <li>• Một số lệnh yêu cầu quyền admin hoặc level nhất định</li>
                    <li>• Sử dụng lệnh /help để xem thêm thông tin chi tiết</li>
                    <li>• Liên hệ admin nếu gặp vấn đề với các lệnh</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 relative z-10">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-5xl mu-retro-title mb-3 sm:mb-6">
              🌟 TÍNH NĂNG NỔI BẬT
            </h2>
            <p className="text-sm sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Khám phá những tính năng độc đáo và hấp dẫn của server {siteConfig.serverName}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>🎯</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Auto Reset</h3>
                <p className="text-gray-300 text-xs sm:text-base">Tự động reset khi đạt level 400, giúp người chơi tiết kiệm thời gian</p>
              </div>
            </div>
            
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
             
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>⚔️</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">PK System</h3>
                <p className="text-gray-300 text-xs sm:text-base">Hệ thống PK công bằng và thú vị với nhiều chế độ chiến đấu</p>
              </div>
            </div>
            
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>🏆</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Guild War</h3>
                <p className="text-gray-300 text-xs sm:text-base">Chiến tranh guild hàng tuần với phần thưởng hấp dẫn</p>
              </div>
            </div>
            
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>💰</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Economy</h3>
                <p className="text-gray-300 text-xs sm:text-base">Hệ thống kinh tế ổn định và cân bằng cho tất cả người chơi</p>
              </div>
            </div>
            
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>🎮</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Events</h3>
                <p className="text-gray-300 text-xs sm:text-base">Sự kiện hàng ngày và hàng tuần với phần thưởng độc quyền</p>
              </div>
            </div>
            
            <div className="mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-6 text-center" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))' }}>🛡️</div>
                <div className="relative z-10 text-center" style={{ paddingTop: '15px' }}>
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4">Anti-Cheat</h3>
                <p className="text-gray-300 text-xs sm:text-base">Hệ thống chống hack hiệu quả, đảm bảo công bằng cho mọi người</p>
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


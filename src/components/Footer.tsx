'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function Footer() {
  
  return (
    <footer 
      className="relative z-10 py-12 mt-12 mu-footer-glow"
      style={{
        background: 'linear-gradient(180deg, rgba(50, 40, 20, 0.98) 0%, rgba(70, 55, 25, 1) 30%, rgba(90, 70, 30, 1) 50%, rgba(70, 55, 25, 1) 70%, rgba(50, 40, 20, 1) 100%), radial-gradient(ellipse at center top, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
        borderTop: '2px solid #FFD700',
        boxShadow: '0 -4px 25px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.3), inset 0 -1px 0 rgba(255, 215, 0, 0.15)'
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/icon.jpg" 
                alt={`${siteConfig.nameGame} - ${siteConfig.gameTitle} Logo`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg"
                style={{
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                }}
              />
              <div>
                <h3 className="text-xl mu-gold-metallic">{siteConfig.nameGame}</h3>
                <p className="mu-text-gold text-sm">{siteConfig.phone}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {siteConfig.gameSubtitle} chuyên nghiệp với hệ thống game ổn định, 
              cộng đồng sôi động và sự kiện thường xuyên.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg mu-retro-title-small flex items-center">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full mr-2" style={{ boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)' }}></span>
              Liên Kết
            </h4>
            <div className="space-y-3">
              <Link href="/info" className="block text-gray-300 hover:mu-text-orange transition-colors flex items-center group mu-retro-link">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-[#FFD700] transition-colors" style={{ boxShadow: '0 0 4px rgba(255, 215, 0, 0.4)' }}></span>
                Thông Tin Server
              </Link>
              <Link href="/download" className="block text-gray-300 hover:mu-text-orange transition-colors flex items-center group mu-retro-link">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-[#FFD700] transition-colors" style={{ boxShadow: '0 0 4px rgba(255, 215, 0, 0.4)' }}></span>
                Tải Game
              </Link>
              <Link href="/donate" className="block text-gray-300 hover:mu-text-orange transition-colors flex items-center group mu-retro-link">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-[#FFD700] transition-colors" style={{ boxShadow: '0 0 4px rgba(255, 215, 0, 0.4)' }}></span>
                Ủng Hộ Server
              </Link>
              <Link href="/news" className="block text-gray-300 hover:mu-text-orange transition-colors flex items-center group mu-retro-link">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-[#FFD700] transition-colors" style={{ boxShadow: '0 0 4px rgba(255, 215, 0, 0.4)' }}></span>
                Tin Tức
              </Link>
              <Link href="/rankings" className="block text-gray-300 hover:mu-text-orange transition-colors flex items-center group mu-retro-link">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-[#FFD700] transition-colors" style={{ boxShadow: '0 0 4px rgba(255, 215, 0, 0.4)' }}></span>
                Bảng Xếp Hạng
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-lg mu-retro-title-small flex items-center">
              <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-2" style={{ boxShadow: '0 0 6px rgba(255, 165, 0, 0.6)' }}></span>
              Mạng Xã Hội
            </h4>
            <div className="flex space-x-4">
              {siteConfig.linkFacebook && (
                <a 
                  href={siteConfig.linkFacebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.15) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFA500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                >
                  <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {siteConfig.linkYoutube && (
                <a 
                  href={siteConfig.linkYoutube} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.15) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFA500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                >
                  <Image src="/youtube-logo.webp" alt="YouTube" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {siteConfig.linkZalo && (
                <a 
                  href={siteConfig.linkZalo} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.15) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFA500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                >
                  <Image src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {siteConfig.linkDiscord && (
                <a 
                  href={siteConfig.linkDiscord} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.15) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFA500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                >
                  <Image src="/discord-logo.webp" alt="Discord" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {siteConfig.linkTikTok && (
                <a 
                  href={siteConfig.linkTikTok} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.15) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFA500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                >
                  <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                Theo dõi chúng tôi để cập nhật tin tức mới nhất
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6" style={{
          borderTop: '1px solid #FFD700',
          boxShadow: '0 -1px 0 rgba(255, 215, 0, 0.3)'
        }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image 
                src="/icon.jpg" 
                alt={`${siteConfig.nameGame} - ${siteConfig.gameTitle} Icon`}
                width={24}
                height={24}
                className="w-4 h-4 sm:w-6 sm:h-6 rounded"
                style={{
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)'
                }}
              />
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} {siteConfig.serverName}. Tất cả quyền được bảo lưu.
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <span>Được phát triển với MGeS</span>
              <span className="mu-text-gold">•</span>
              <span>Version 1.2</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


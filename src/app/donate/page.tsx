'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Donate() {
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
            className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/logoweb.jpg)',
              backgroundAttachment: 'fixed'
            }}
          ></div>
          
          {/* Mobile Background - Simple gradient */}
          <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        </>
      )}
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Top Header - Hidden initially, shows on scroll */}
        <div className={`fixed top-0 left-0 right-0 bg-black/95 py-2 border-b border-gray-600 z-50 transition-all duration-500 ${
          isClient && isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="text-green-400 text-sm font-medium whitespace-nowrap">🟢 Server Online</div>
          <div className="flex gap-3 items-center">
            <Link href="/register" className="text-white text-sm font-medium px-3 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all whitespace-nowrap">
              ĐĂNG KÝ
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/login" className="text-white text-sm font-medium px-3 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all whitespace-nowrap">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
        </div>

        {/* Navigation - Hidden initially, shows on scroll */}
        <nav className={`fixed top-12 left-0 right-0 bg-black/95 py-4 border-b-2 border-blue-400 z-50 transition-all duration-500 ${
          isClient && isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="max-w-6xl mx-auto px-5">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center">
              <div className="flex gap-8 justify-center">
                <Link href="/" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  TRANG CHỦ
                </Link>
                <Link href="/info" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  THÔNG TIN
                </Link>
                <Link href="/download" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  TẢI GAME
                </Link>
                <Link href="/donate" className="text-blue-300 font-bold hover:text-blue-200 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  QUYÊN GÓP
                </Link>
                <Link href="/news" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  TIN TỨC
                </Link>
                <Link href="/rankings" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
                  XẾP HẠNG
                </Link>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image 
                    src="/Mu.PNG" 
                    alt="Mu Logo" 
                    width={40}
                    height={16}
                    className="w-8 h-auto"
                  />
                  <span className="text-white font-bold text-sm">MuDauTruongSS1</span>
                </div>
                
                <button 
                  className="text-white p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Menu */}
              <div className={`transition-all duration-300 ${
                mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="py-4 space-y-3 border-t border-gray-700 mt-3">
                  <Link href="/" className="block text-white hover:text-blue-400 transition-colors py-2">TRANG CHỦ</Link>
                  <Link href="/info" className="block text-white hover:text-blue-400 transition-colors py-2">THÔNG TIN</Link>
                  <Link href="/download" className="block text-white hover:text-blue-400 transition-colors py-2">TẢI GAME</Link>
                  <Link href="/donate" className="block text-blue-300 hover:text-blue-200 transition-colors py-2">QUYÊN GÓP</Link>
                  <Link href="/news" className="block text-white hover:text-blue-400 transition-colors py-2">TIN TỨC</Link>
                  <Link href="/rankings" className="block text-white hover:text-blue-400 transition-colors py-2">XẾP HẠNG</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation dot */}
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 py-8">

      {/* Page Header */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">💎 ỦNG HỘ SERVER</h1>
          <p className="text-xl text-blue-300">Hỗ trợ server phát triển và duy trì hoạt động</p>
        </div>
      </section>

      {/* Donate Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">💰 CÁC GÓI ỦNG HỘ SERVER</h2>
              <p className="text-xl text-blue-300">Chọn gói ủng hộ phù hợp với bạn</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Package 1 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30 hover-lift transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💎</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Chaos</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">12.000đ</div>
                  <p className="text-gray-300">/ 1 Chaos</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Chaos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Sử dụng để up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Tỷ lệ thành công cao</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>

              {/* Package 2 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/30 hover-lift transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    PHỔ BIẾN
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gold Member</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100.000đ</div>
                  <p className="text-gray-300">/ 30 ngày</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Tăng 5% tỷ lệ up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Up đồ +10/+11/+12/+13</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Thời hạn 30 ngày</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Ưu đãi đặc biệt</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>

              {/* Package 3 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">❤️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Life</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">500đ</div>
                  <p className="text-gray-300">/ 1 Life</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Life</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Hồi sinh khi chết</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Giá rẻ nhất</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">💳 THÔNG TIN CHUYỂN KHOẢN</h2>
            
            <div className="flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* Bank Transfer */}
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">🏦 CHUYỂN KHOẢN NGÂN HÀNG</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Số tài khoản:</div>
                      <div className="text-lg font-bold text-white">0356673016</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Chủ tài khoản:</div>
                      <div className="text-lg font-bold text-white">NGUYEN CANH QUYEN</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Ngân hàng:</div>
                      <div className="text-lg font-bold text-white">MB-BANK</div>
                    </div>
                    <div className="text-center">
                      <Image 
                        src="/qrcode.jpeg" 
                        alt="QR Code" 
                        width={200} 
                        height={200}
                        className="mx-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 HƯỚNG DẪN THANH TOÁN</h3>
                  <div className="text-white space-y-2">
                    <p>1. Chọn gói ủng hộ phù hợp</p>
                    <p>2. Chuyển khoản theo thông tin trên</p>
                    <p>3. Ghi nội dung: &quot;Tên Tài Khoản + Gói ủng hộ&quot;</p>
                    <p>4. Gửi bill cho Admin qua Zalo: 03377.14.654</p>
                    <p>5. Chờ Admin xử lý và cấp phần thưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      {/* Footer */}
      <footer className="bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-blue-500/30 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">MuDauTruongSS1.Net</h3>
                  <p className="text-blue-300 text-sm">033.77.14.654</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Server Mu Online Season 1 chuyên nghiệp với hệ thống game ổn định, 
                cộng đồng sôi động và sự kiện thường xuyên.
              </p>
            </div>

            {/* Links Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Liên Kết
              </h4>
              <div className="space-y-3">
                <Link href="/info" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  Thông Tin Server
                </Link>
                <Link href="/download" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  Tải Game
                </Link>
                <Link href="/donate" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  Ủng Hộ Server
                </Link>
                <Link href="/news" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  Tin Tức
                </Link>
                <Link href="/rankings" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  Bảng Xếp Hạng
                </Link>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Mạng Xã Hội
              </h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1K54dD4kW1/?mibextid=wwXIfr" className="group flex items-center justify-center w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                  <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tiktok.com/@mudautruongss1?_t=ZS-90eQbTHy1sf&_r=1" className="group flex items-center justify-center w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-110">
                  <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://zalo.me/g/xeupyo721" className="group flex items-center justify-center w-12 h-12 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-110">
                  <Image src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <div className="pt-4">
                <p className="text-gray-400 text-sm">
                  Theo dõi chúng tôi để cập nhật tin tức mới nhất
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded"
                />
                <p className="text-gray-400 text-sm">
                  © 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Được phát triển với MGeS</span>
                <span>•</span>
                <span>Version 1.2</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

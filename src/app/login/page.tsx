'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleCaptcha from '@/components/SimpleCaptcha';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [captchaValid, setCaptchaValid] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username) newErrors.username = 'Tên đăng nhập là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Store user data in localStorage
        localStorage.setItem('auth_token', 'temp_token_' + Date.now());
        localStorage.setItem('user_data', JSON.stringify(result.data));
        
        alert('Đăng nhập thành công!');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    }
  };

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
                <Link href="/donate" className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10">
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
                  <Link href="/donate" className="block text-white hover:text-blue-400 transition-colors py-2">QUYÊN GÓP</Link>
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
        <div className="max-w-md mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              ĐĂNG NHẬP
            </h1>
            <p className="text-lg text-gray-300">
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          <div className="bg-black bg-opacity-70 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-800 text-white border rounded-lg focus:outline-none ${
                    errors.username ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                  }`}
                  placeholder="Nhập tên đăng nhập"
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-800 text-white border rounded-lg focus:outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="text-right">
                <Link href="#" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Quên mật khẩu?
                </Link>
              </div>

              {/* CAPTCHA */}
              <SimpleCaptcha onVerify={setCaptchaValid} />

              <button
                type="submit"
                disabled={!captchaValid}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all ${
                  captchaValid 
                    ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {captchaValid ? 'ĐĂNG NHẬP' : 'VUI LÒNG XÁC THỰC CAPTCHA'}
              </button>

              <div className="text-center text-white">
                <p>
                  Chưa có tài khoản?{' '}
                  <Link href="/register" className="text-yellow-400 hover:text-yellow-300">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/90 text-white py-12 mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo và mô tả */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/icon.jpg" 
                    alt="Mu Logo" 
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg mr-3"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">MuDauTruongSS1.Net</h3>
                    <p className="text-blue-300 text-sm">Đấu Trường SS1</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. 
                  Cộng đồng game thủ Việt Nam hàng đầu.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/share/1K54dD4kW1/?mibextid=wwXIfr" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Image src="/facebook-logo.webp" alt="Facebook" width={24} height={24} />
                  </a>
                  <a href="https://www.tiktok.com/@mudautruongss1?_t=ZS-90eQbTHy1sf&_r=1" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Image src="/tiktok-logo.webp" alt="TikTok" width={24} height={24} />
                  </a>
                  <a href="https://zalo.me/g/xeupyo721" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Image src="/Zalo-icon.webp" alt="Zalo" width={24} height={24} />
                  </a>
                </div>
              </div>

              {/* Liên kết nhanh */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Liên kết nhanh</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Trang chủ</Link></li>
                  <li><Link href="/info" className="text-gray-300 hover:text-blue-400 transition-colors">Thông tin server</Link></li>
                  <li><Link href="/download" className="text-gray-300 hover:text-blue-400 transition-colors">Tải game</Link></li>
                  <li><Link href="/donate" className="text-gray-300 hover:text-blue-400 transition-colors">Ủng hộ server</Link></li>
                  <li><Link href="/news" className="text-gray-300 hover:text-blue-400 transition-colors">Tin tức</Link></li>
                </ul>
              </div>

              {/* Hỗ trợ */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Hỗ trợ</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Điều khoản dịch vụ</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Chính sách bảo mật</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Liên hệ admin</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Hướng dẫn chơi</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
          {/* Bottom Section */}
          <div className="border-t border-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={24}
                  height={24}
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded"
                />
                <p className="text-gray-400 text-xs sm:text-sm">
                  © 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.
                </p>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-400">
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

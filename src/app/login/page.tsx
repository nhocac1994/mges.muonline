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
    // Đảm bảo giữ nguyên case của user input, không tự động uppercase
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
        // Store JWT token và user data in localStorage
        if (result.data.token) {
          localStorage.setItem('auth_token', result.data.token);
        }
        localStorage.setItem('user_data', JSON.stringify(result.data));
        
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
      )}
      
      {/* Background for main content */}
      <div className="fixed inset-0 -z-10 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10" style={{ paddingTop: '92px' }}>
        {/* Main Content */}
        <main className="relative z-10 py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl mu-retro-title mb-4">
              ĐĂNG NHẬP
            </h1>
            <p className="text-lg text-gray-300">
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          <div className="mu-retro-card-blur" style={{ padding: '56px 56px 56px 56px', paddingTop: '40px' }}>
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2 mu-text-gold">
                    Tên đăng nhập *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`mu-retro-input w-full ${
                      errors.username ? 'border-red-500' : ''
                    }`}
                    placeholder="Nhập tên đăng nhập"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck="false"
                    style={{ textTransform: 'none' }}
                  />
                  {errors.username && <p className="mu-text-red text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 mu-text-gold">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`mu-retro-input w-full ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Nhập mật khẩu"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck="false"
                    style={{ textTransform: 'none' }}
                  />
                  {errors.password && <p className="mu-text-red text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="text-right">
                  <Link href="#" className="mu-retro-link text-sm">
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* CAPTCHA */}
                <SimpleCaptcha onVerify={setCaptchaValid} />

                <button
                  type="submit"
                  disabled={!captchaValid}
                  className={`mu-retro-btn-classic w-full font-bold py-3 px-6 ${
                    !captchaValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {captchaValid ? 'ĐĂNG NHẬP' : 'VUI LÒNG XÁC THỰC CAPTCHA'}
                </button>

                <div className="text-center text-white">
                  <p className="text-lg">
                    Chưa có tài khoản?{' '}
                    <Link href="/register" className="mu-retro-link">
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

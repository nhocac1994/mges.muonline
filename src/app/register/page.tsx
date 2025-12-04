'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleCaptcha from '@/components/SimpleCaptcha';
import siteConfig from '@/config/site.config.json';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    characterName: '',
    email: '',
    phone: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [successData, setSuccessData] = useState<{
    username: string;
    characterName: string;
    email: string;
    phone: string;
    securityQuestion: string;
    securityAnswer: string;
  } | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (formData.username.length < 3) newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.characterName) newErrors.characterName = 'Tên nhân vật là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!formData.securityQuestion) newErrors.securityQuestion = 'Câu hỏi bảo mật là bắt buộc';
    if (!formData.securityAnswer) newErrors.securityAnswer = 'Câu trả lời bảo mật là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
            const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Lưu thông tin thành công và hiển thị
        setSuccessData(formData);
        setIsSuccess(true);
        // Reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          characterName: '',
          email: '',
          phone: '',
          securityQuestion: '',
          securityAnswer: ''
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl mu-retro-title mb-4">
              ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <p className="text-xl text-gray-300">
              Tạo tài khoản mới để bắt đầu hành trình Mu Online
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && successData && (
            <div className="mb-8 mu-retro-card-blur" style={{ padding: '56px 56px 56px 56px', paddingTop: '40px' }}>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">✅</span>
                  </div>
                  <h2 className="text-3xl mu-retro-title mb-2 mu-text-gold">ĐĂNG KÝ THÀNH CÔNG!</h2>
                  <p className="text-green-300 text-lg">Tài khoản của bạn đã được tạo thành công</p>
                </div>

                <div className="bg-black/50 rounded-lg p-6">
                  <h3 className="text-xl mu-retro-title-small mb-4 text-center">📋 THÔNG TIN TÀI KHOẢN</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Tên đăng nhập:</div>
                      <div className="text-lg font-bold text-white">{successData.username}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Tên nhân vật:</div>
                      <div className="text-lg font-bold text-white">{successData.characterName}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Email:</div>
                      <div className="text-lg font-bold text-white">{successData.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Số điện thoại:</div>
                      <div className="text-lg font-bold text-white">{successData.phone}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Câu hỏi bảo mật:</div>
                      <div className="text-lg font-bold text-white">
                        {successData.securityQuestion === 'pet' && 'Tên thú cưng đầu tiên của bạn?'}
                        {successData.securityQuestion === 'school' && 'Tên trường tiểu học của bạn?'}
                        {successData.securityQuestion === 'city' && 'Thành phố bạn sinh ra?'}
                        {successData.securityQuestion === 'food' && 'Món ăn yêu thích của bạn?'}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Trạng thái:</div>
                      <div className="text-lg font-bold text-green-400">✅ Tài khoản đã kích hoạt</div>
                    </div>
                  </div>
                </div>
                </div>

                <div className="mt-6 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-blue-500/30">
                  <h4 className="text-lg mu-retro-title-small mb-2 mu-text-gold">🎮 BƯỚC TIẾP THEO</h4>
                  <ul className="text-gray-300 space-y-1 text-lg">
                    <li>• Tải game client từ trang <Link href="/download" className="mu-retro-link">TẢI GAME</Link></li>
                    <li>• Đăng nhập với thông tin tài khoản trên</li>
                    <li>• Bắt đầu hành trình {siteConfig.gameTitle}</li>
                    <li>• Tham gia cộng đồng game thủ Việt Nam</li>
                  </ul>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mu-retro-btn mr-4"
                  >
                    ĐĂNG KÝ TÀI KHOẢN KHÁC
                  </button>
                  <Link
                    href="/login"
                    className="mu-retro-btn-classic inline-block"
                  >
                    ĐĂNG NHẬP NGAY
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!isSuccess && (
            <div className="mu-retro-card-blur" style={{ padding: '56px 56px 56px 56px', paddingTop: '40px' }}>
              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin tài khoản */}
                <div>
                  <h3 className="text-2xl mu-retro-title-small mb-6 mu-text-gold">Thông tin tài khoản</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
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
                      className={`mu-retro-input w-full ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Xác nhận mật khẩu *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Tên nhân vật *
                    </label>
                    <input
                      type="text"
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.characterName ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập tên nhân vật"
                    />
                    {errors.characterName && <p className="text-red-400 text-sm mt-1">{errors.characterName}</p>}
                  </div>
                </div>
              </div>

                {/* Thông tin cá nhân */}
                <div>
                  <h3 className="text-2xl mu-retro-title-small mb-6 mu-text-gold">Thông tin cá nhân</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập email"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

                {/* Bảo mật */}
                <div>
                  <h3 className="text-2xl mu-retro-title-small mb-6 mu-text-gold">Bảo mật</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Câu hỏi bảo mật *
                    </label>
                    <select
                      name="securityQuestion"
                      value={formData.securityQuestion}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.securityQuestion ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Chọn câu hỏi bảo mật</option>
                      <option value="pet">Tên thú cưng đầu tiên của bạn?</option>
                      <option value="school">Tên trường tiểu học của bạn?</option>
                      <option value="city">Thành phố bạn sinh ra?</option>
                      <option value="food">Món ăn yêu thích của bạn?</option>
                    </select>
                    {errors.securityQuestion && <p className="text-red-400 text-sm mt-1">{errors.securityQuestion}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Câu trả lời *
                    </label>
                    <input
                      type="text"
                      name="securityAnswer"
                      value={formData.securityAnswer}
                      onChange={handleInputChange}
                      className={`mu-retro-input w-full ${
                        errors.securityAnswer ? 'border-red-500' : ''
                      }`}
                      placeholder="Nhập câu trả lời"
                    />
                    {errors.securityAnswer && <p className="text-red-400 text-sm mt-1">{errors.securityAnswer}</p>}
                  </div>
                </div>
              </div>

                {/* CAPTCHA */}
                <div>
                  <h3 className="text-2xl mu-retro-title-small mb-6 mu-text-gold">Xác thực bảo mật</h3>
                  <SimpleCaptcha onVerify={setCaptchaValid} />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={!captchaValid || isLoading}
                    className={`mu-retro-btn-classic font-bold py-4 px-8 text-lg flex items-center justify-center gap-3 mx-auto ${
                      !captchaValid || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        ĐANG XỬ LÝ...
                      </>
                    ) : captchaValid ? (
                      'TẠO TÀI KHOẢN'
                    ) : (
                      'VUI LÒNG XÁC THỰC CAPTCHA'
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center text-white">
                  <p className="text-lg">
                    Đã có tài khoản?{' '}
                    <Link href="/login" className="mu-retro-link">
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}

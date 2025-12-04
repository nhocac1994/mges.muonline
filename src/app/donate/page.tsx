'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

export default function Donate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-5xl mu-retro-title mb-2 sm:mb-4">ỦNG HỘ SERVER</h1>
          <p className="text-sm sm:text-xl text-gray-300">Hỗ trợ server phát triển và duy trì hoạt động</p>
        </div>
      </section>

      {/* Donate Packages */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
              {/* Package 1 */}
              <div className="text-center mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl mu-retro-title-small mb-3 sm:mb-4">Gói Chaos</h3>
                  {/* <div className="text-5xl mt-10 mb-6" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(0, 255, 0, 0.6))' }}>💎</div> */}
                  <div className="text-xl sm:text-3xl font-bold mu-text-gold mb-2 mt-10 sm:mt-10">12.000đ</div>
                  <p className="text-gray-300 text-sm sm:text-lg mb-4 sm:mb-6">/ 1 Chaos</p>
                  <div className="space-y-2 sm:space-y-4" style={{ marginTop: '20px' }}>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Nhận ngay 1 Chaos</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Sử dụng để up đồ</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Tỷ lệ thành công cao</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package 2 */}
              <div className="text-center mu-retro-card relative" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                {/* <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="mu-retro-badge-event px-4 py-1 text-sm font-bold">
                    PHỔ BIẾN
                  </span>
                </div> */}
                <div className="relative z-10">
                 
                  <h3 className="text-xl sm:text-2xl mu-retro-title-small mb-3 sm:mb-4">Gold Member</h3>
                  {/* <div className="text-5xl mb-6 mt-10" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))' }}>👑</div> */}
                  <div className="text-xl sm:text-3xl font-bold mu-text-gold mb-2 mt-10 sm:mt-10">100.000đ</div>
                  <p className="text-gray-300 text-sm sm:text-lg mb-4 sm:mb-6">/ 30 ngày</p>
                  <div className="space-y-2 sm:space-y-4" style={{ marginTop: '20px' }}>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Tăng 5% tỷ lệ up đồ</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Up đồ +10/+11/+12/+13</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Thời hạn 30 ngày</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Ưu đãi đặc biệt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package 3 */}
              <div className="text-center mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
                <div className="relative z-10">
                  
                  <h3 className="text-xl sm:text-2xl mu-retro-title-small mb-3 sm:mb-4">Gói Life</h3>
                  {/* <div className="text-5xl mb-6 mt-10" style={{ filter: 'brightness(2.5) drop-shadow(0 0 12px rgba(0, 150, 255, 0.6))' }}>❤️</div> */}
                  <div className="text-xl sm:text-3xl font-bold mu-text-gold mb-2 mt-10 sm:mt-10">500đ</div>
                  <p className="text-gray-300 text-sm sm:text-lg mb-4 sm:mb-6">/ 1 Life</p>
                  <div className="space-y-2 sm:space-y-4" style={{ marginTop: '20px' }}>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Nhận ngay 1 Life</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Hồi sinh khi chết</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-white text-xs sm:text-lg">Giá rẻ nhất</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl mu-retro-title mb-2 sm:mb-4">THÔNG TIN CHUYỂN KHOẢN</h2>
            <p className="text-sm sm:text-xl text-gray-300">Thông tin tài khoản ngân hàng</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Bank Transfer */}
            <div className="mu-retro-card text-center" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl mu-retro-title-small mt-4 sm:mt-10 mb-4 sm:mb-8">CHUYỂN KHOẢN NGÂN HÀNG</h3>
                <div className="space-y-3 sm:space-y-5" style={{ marginTop: '30px' }}>
                  <div className="bg-transparent rounded-lg p-2">
                    <div className="text-xs sm:text-sm text-gray-400 mt-10 sm:mt-20 mb-1 sm:mb-2">Số tài khoản:</div>
                    <div className="text-base sm:text-xl font-bold mu-text-gold">{siteConfig.bankTransfer.accountNumber}</div>
                  </div>
                  <div className="bg-transparent rounded-lg p-2">
                    <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Chủ tài khoản:</div>
                    <div className="text-base sm:text-xl font-bold mu-text-gold">{siteConfig.bankTransfer.accountHolder}</div>
                  </div>
                  <div className="bg-transparent rounded-lg p-2">
                    <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Ngân hàng:</div>
                    <div className="text-base sm:text-xl font-bold mu-text-gold">{siteConfig.bankTransfer.bankName}</div>
                  </div>
                  <div className="text-center mt-4 sm:mt-6">
                    <Image 
                      src={siteConfig.bankTransfer.qrCodeUrl} 
                      alt="QR Code" 
                      width={200} 
                      height={200}
                      className="mx-auto rounded-lg w-32 h-32 sm:w-48 sm:h-48"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 sm:mt-8 mu-retro-card" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-4 sm:mb-6 mt-2 sm:mt-10 text-center">HƯỚNG DẪN THANH TOÁN</h3>
                <div className="text-white space-y-2 sm:space-y-3 text-sm sm:text-lg mt-10 sm:mt-20 ml-10 sm:ml-20" style={{ marginTop: '30px' }}>
                  <p className="mt-10 sm:mt-30">1. Chọn gói ủng hộ phù hợp</p>
                  <p className="mt-1 sm:mt-2">2. Chuyển khoản theo thông tin trên</p>
                  <p className="mt-1 sm:mt-2">3. Ghi nội dung: &quot;Tên Tài Khoản + Gói ủng hộ&quot;</p>
                  <p className="mt-1 sm:mt-2">4. Gửi bill cho Admin qua Zalo: 03377.14.654</p>
                  <p className="mt-1 sm:mt-2">5. Chờ Admin xử lý và cấp phần thưởng</p>
                </div>
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

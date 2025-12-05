'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/site.config.json';

interface Character {
  name: string;
  level: number;
  class: number;
  className: string;
  resetCount: number;
  masterResetCount: number;
  stats: {
    strength: number;
    dexterity: number;
    vitality: number;
    energy: number;
    leadership: number;
  };
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
  money: number;
  mapNumber: number;
  mapPosX: number;
  mapPosY: number;
  pkCount: number;
  pkLevel: number;
}

interface CharacterData {
  name: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  expProgress: number;
  class: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  leadership: number;
  money: number;
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
  mapNumber: number;
  mapPosX: number;
  mapPosY: number;
  pkCount: number;
  pkLevel: number;
  resetCount: number;
  masterResetCount: number;
  isOnline: boolean;
  connectTime: string;
  disconnectTime: string;
  totalPlayTime: number;
  playTimeHours: number;
  playTimeMinutes: number;
}

interface ResetData {
  dailyReset: number;
  weeklyReset: number;
  monthlyReset: number;
  lastDailyReset: string;
  lastWeeklyReset: string;
  lastMonthlyReset: string;
  masterDailyReset: number;
  masterWeeklyReset: number;
  masterMonthlyReset: number;
  lastMasterDailyReset: string;
  lastMasterWeeklyReset: string;
  lastMasterMonthlyReset: string;
  totalResetCount: number;
  totalMasterResetCount: number;
}

interface GuildData {
  name: string;
  master: string;
  score: number;
  memberCount: number;
}

interface DashboardData {
  account: {
    id: string;
    characterCount: number;
    level: number;
    levelName: string;
    levelColor: string;
    expireDate: string;
    isExpired: boolean;
  };
  character: CharacterData;
  reset: ResetData;
  warehouse: {
    money: number;
  };
  guild: GuildData | null;
}

export default function Dashboard() {
  const [user, setUser] = useState<{memb___id: string; memb_name: string} | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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

  const getClassName = (classId: number): string => {
    const classNames: {[key: number]: string} = {
      0: 'Dark Wizard',
      1: 'Soul Master', 
      2: 'Grand Master',
      16: 'Dark Knight',
      17: 'Blade Knight',
      18: 'Blade Master',
      32: 'Fairy Elf',
      33: 'Muse Elf',
      34: 'High Elf',
      48: 'Magic Gladiator',
      50: 'Dark Lord',
      64: 'Summoner',
      65: 'Bloody Summoner',
      66: 'Dimension Master',
      80: 'Rage Fighter',
      81: 'Fist Master'
    };
    return classNames[classId] || 'Unknown';
  };

  const formatMoney = (money: number): string => {
    return new Intl.NumberFormat('vi-VN').format(money);
  };

  const formatText = (text: string | null | undefined): string => {
    if (!text) return '';
    // Giữ nguyên nếu là số hoặc có chữ số
    if (/^\d+$/.test(text) || /\d/.test(text)) {
      return text;
    }
    // Format title case: chữ cái đầu viết hoa, còn lại viết thường
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatAccountName = (name: string | null | undefined): string => {
    if (!name) return '';
    // Giữ nguyên nếu có số hoặc ký tự đặc biệt
    if (/\d/.test(name) || /[^a-zA-Z0-9]/.test(name)) {
      return name;
    }
    // Format: chữ cái đầu viết hoa, còn lại viết thường
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formatTime = (hours: number, minutes: number): string => {
    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`;
    }
    return `${minutes} phút`;
  };

  const fetchCharacters = async (accountId: string) => {
    try {
      setCharactersLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/characters?accountId=${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setCharacters(result.data.characters);
        // Set first character as default selected
        if (result.data.characters.length > 0) {
          setSelectedCharacter(result.data.characters[0]);
        }
      } else {
        console.error('Failed to fetch characters:', result.message);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setCharactersLoading(false);
    }
  };

  const handleCharacterChange = (characterName: string) => {
    const character = characters.find(char => char.name === characterName);
    if (character) {
      setSelectedCharacter(character);
    }
  };

  const handleUpdateAccount = async (updateData: Record<string, string>) => {
    try {
      setUpdateLoading(true);
      const response = await fetch('/api/account/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: user?.memb___id,
          updateData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Cập nhật thông tin thành công!');
        setShowAccountModal(false);
        // Refresh user data
        const userData = localStorage.getItem('user_data');
        if (userData) {
          const updatedUser = JSON.parse(userData);
          updatedUser.memb_name = updateData.memb_name || updatedUser.memb_name;
          localStorage.setItem('user_data', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } else {
        alert('Lỗi: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Lỗi khi cập nhật thông tin');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      if (!user?.memb___id) {
        alert('Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.');
        return;
      }

      setUpdateLoading(true);
      const response = await fetch('/api/account/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: user.memb___id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Đổi mật khẩu thành công!');
        setShowPasswordModal(false);
      } else {
        alert('Lỗi: ' + result.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Lỗi khi đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }
        
        // Parse user data để lấy account ID
        const parsedUser = JSON.parse(userData);
        const accountId = parsedUser.memb___id || parsedUser.username || parsedUser.accountId || parsedUser.id;
        
        if (!accountId) {
          console.error('Không tìm thấy account ID');
          router.push('/login');
          return;
        }
        
        console.log('Loading dashboard for account:', accountId);
        
        // Set user từ localStorage trước
        setUser({
          memb___id: accountId,
          memb_name: parsedUser.memb_name || parsedUser.username || parsedUser.characterName || accountId
        });
        
        // Fetch characters first
        await fetchCharacters(accountId);
        
        // Lấy thông tin dashboard từ API với account ID
        const response = await fetch(`/api/dashboard?accountId=${accountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'x-user-account': accountId
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setDashboardData(result.data);
            // Cập nhật user với thông tin từ API nếu có
            if (result.data.account?.id) {
              setUser(prev => ({
                memb___id: result.data.account.id,
                memb_name: prev?.memb_name || result.data.account.id
              }));
            }
          } else {
            console.error('Failed to load dashboard data:', result.message);
          }
        } else {
          console.error('Failed to fetch dashboard data');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden mu-retro-bg-texture" style={{
      fontFamily: 'Arial, Helvetica, sans-serif'
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
        {/* User Info Header - Always visible */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-[#FFD700]/30" style={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(101, 67, 33, 0.8) 100%)',
          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
        }}>
          <div className="max-w-6xl mx-auto px-2 sm:px-5 py-2 sm:py-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Top Row: Logo and Greeting */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Image src="/icon.jpg" alt="Mu Online Logo" width={40} height={40} className="rounded-lg w-8 h-8 sm:w-10 sm:h-10"/>
                  <div>
                    <h1 className="text-sm sm:text-lg font-bold mu-text-gold">{siteConfig.serverName}</h1>
                    <p className="mu-text-gold text-[10px] sm:text-xs">{siteConfig.serverVersion}</p>
                  </div>
                </div>
                <span className="text-white text-xs sm:text-sm">Xin chào, <span className="mu-text-gold">{user?.memb_name}</span></span>
              </div>
              
              {/* Bottom Row: Character Selector and Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full">
                {/* Character Selector */}
                {characters.length > 0 && (
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="text-gray-300 text-xs sm:text-sm flex-shrink-0">Character:</span>
                    <select
                      value={selectedCharacter?.name || ''}
                      onChange={(e) => handleCharacterChange(e.target.value)}
                      disabled={charactersLoading}
                      className="mu-retro-input px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm flex-1 min-w-0"
                    >
                      {characters.map((char) => (
                        <option key={char.name} value={char.name}>
                          {char.name} ({char.className}) - Lv.{char.level}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowAccountModal(true)}
                    className="mu-retro-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-none"
                  >
                    Quản lý
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="mu-retro-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-none"
                    style={{ background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)' }}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="text-center text-white mb-6 sm:mb-12">
            <h1 className="text-2xl sm:text-5xl mu-retro-title mb-2 sm:mb-4">
              DASHBOARD
            </h1>
            <p className="text-sm sm:text-xl text-gray-300">Chào mừng bạn đến với {siteConfig.serverName}</p>
          </div>

          {/* User Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Thông tin tài khoản */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Thông tin tài khoản</h3>
              <div className="space-y-2 sm:space-y-3">
                <p className="text-white text-sm sm:text-lg leading-relaxed"><span className="text-gray-300 font-semibold">Tên đăng nhập:</span> <span className="mu-text-gold font-bold text-base sm:text-lg ml-2">{formatAccountName(user?.memb___id || dashboardData?.account?.id || 'N/A')}</span></p>
                <p className="text-white text-sm sm:text-lg leading-relaxed"><span className="text-gray-300 font-semibold">Nhân vật chính:</span> <span className="mu-text-gold font-bold text-base sm:text-lg ml-2">{formatAccountName(dashboardData?.character?.name || selectedCharacter?.name || 'Chưa có')}</span></p>
                <p className="text-white text-sm sm:text-lg leading-relaxed"><span className="text-gray-300 font-semibold">Số nhân vật:</span> <span className="mu-text-gold font-bold text-base sm:text-lg ml-2">{dashboardData?.account?.characterCount ?? characters.length ?? 0}</span></p>
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="text-gray-400 text-xs sm:text-base">Loại tài khoản:</span>
                  <span 
                    className="px-2 py-1 rounded text-xs sm:text-sm font-semibold"
                    style={{ 
                      backgroundColor: dashboardData?.account?.levelColor || '#808080',
                      color: '#000'
                    }}
                  >
                    {formatText(dashboardData?.account?.levelName || 'Thường')}
                  </span>
                </div>
                {dashboardData?.account?.expireDate && (
                  <p className="text-white text-xs sm:text-base">
                    <span className="text-gray-400">Hết hạn:</span> 
                    <span className={dashboardData?.account?.isExpired ? 'text-red-400' : 'text-green-400'}>
                      {new Date(dashboardData.account.expireDate).toLocaleDateString('vi-VN')}
                    </span>
                  </p>
                )}
                <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Trạng thái:</span> 
                  <span className={`ml-2 ${dashboardData?.character?.isOnline ? 'text-green-400' : 'text-red-400'}`}>
                    {dashboardData?.character?.isOnline ? 'Online' : 'Offline'}
                  </span>
                </p>
              </div>
              </div>
            </div>

            {/* Trạng thái game */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Trạng thái game</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Server:</span> <span className="text-green-400">Online</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Cấp độ:</span> <span className="mu-text-gold">{selectedCharacter?.level ?? dashboardData?.character?.level ?? 0}</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Class:</span> <span className="mu-text-gold">{formatText(selectedCharacter?.className || getClassName(dashboardData?.character?.class ?? 0))}</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Kinh nghiệm:</span> <span className="mu-text-gold">{formatMoney(dashboardData?.character?.experience ?? 0)}/{formatMoney(dashboardData?.character?.nextLevelExp ?? 0)}</span></p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${dashboardData?.character?.expProgress ?? 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thống kê */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Thống kê</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Thời gian chơi:</span> <span className="mu-text-gold">{formatTime(dashboardData?.character?.playTimeHours ?? 0, dashboardData?.character?.playTimeMinutes ?? 0)}</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">PK Count:</span> <span className="mu-text-gold">{selectedCharacter?.pkCount ?? dashboardData?.character?.pkCount ?? 0}</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">PK Level:</span> <span className="mu-text-gold">{selectedCharacter?.pkLevel ?? dashboardData?.character?.pkLevel ?? 0}</span></p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Vị trí:</span> <span className="mu-text-gold">Map {selectedCharacter?.mapNumber ?? dashboardData?.character?.mapNumber ?? 0} ({selectedCharacter?.mapPosX ?? dashboardData?.character?.mapPosX ?? 0}, {selectedCharacter?.mapPosY ?? dashboardData?.character?.mapPosY ?? 0})</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Character Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Stats */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px', minHeight: 'auto' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Chỉ số nhân vật</h3>
              <div className="space-y-2 sm:space-y-2.5">
                {/* Basic Stats */}
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Strength:</span> 
                    <span className="font-bold text-orange-400 text-xs sm:text-base">{selectedCharacter?.stats?.strength ?? dashboardData?.character?.strength ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Dexterity:</span> 
                    <span className="font-bold text-blue-400 text-xs sm:text-base">{selectedCharacter?.stats?.dexterity ?? dashboardData?.character?.dexterity ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Vitality:</span> 
                    <span className="font-bold text-red-400 text-xs sm:text-base">{selectedCharacter?.stats?.vitality ?? dashboardData?.character?.vitality ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Energy:</span> 
                    <span className="font-bold text-purple-400 text-xs sm:text-base">{selectedCharacter?.stats?.energy ?? dashboardData?.character?.energy ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Leadership:</span> 
                    <span className="font-bold text-yellow-400 text-xs sm:text-base">{selectedCharacter?.stats?.leadership ?? dashboardData?.character?.leadership ?? 0}</span>
                  </div>
                </div>
                
                {/* Additional Stats */}
                <div className="pt-2 sm:pt-3 border-t border-gray-600/50 mt-2 sm:mt-3 space-y-2 sm:space-y-2.5">
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Level:</span> 
                    <span className="font-bold text-green-400 text-xs sm:text-base">{selectedCharacter?.level ?? dashboardData?.character?.level ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Class:</span> 
                    <span className="font-bold text-cyan-400 text-xs sm:text-base">{formatText(selectedCharacter?.className || getClassName(dashboardData?.character?.class ?? 0))}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">PK Count:</span> 
                    <span className="font-bold text-red-300 text-xs sm:text-base">{selectedCharacter?.pkCount ?? dashboardData?.character?.pkCount ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">PK Level:</span> 
                    <span className="font-bold text-red-300 text-xs sm:text-base">{selectedCharacter?.pkLevel ?? dashboardData?.character?.pkLevel ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Reset Count:</span> 
                    <span className="font-bold text-blue-300 text-xs sm:text-base">{selectedCharacter?.resetCount ?? dashboardData?.character?.resetCount ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 sm:py-2">
                    <span className="text-gray-300 text-xs sm:text-sm">Master Reset:</span> 
                    <span className="font-bold text-purple-300 text-xs sm:text-base">{selectedCharacter?.masterResetCount ?? dashboardData?.character?.masterResetCount ?? 0}</span>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Life & Mana */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">HP & MP</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Life:</span> <span className="mu-text-gold">{Math.floor(selectedCharacter?.life ?? dashboardData?.character?.life ?? 0)}/{Math.floor(selectedCharacter?.maxLife ?? dashboardData?.character?.maxLife ?? 0)}</span></p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, ((selectedCharacter?.life ?? dashboardData?.character?.life ?? 0) / (selectedCharacter?.maxLife ?? dashboardData?.character?.maxLife ?? 1)) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Mana:</span> <span className="mu-text-gold">{Math.floor(selectedCharacter?.mana ?? dashboardData?.character?.mana ?? 0)}/{Math.floor(selectedCharacter?.maxMana ?? dashboardData?.character?.maxMana ?? 0)}</span></p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, ((selectedCharacter?.mana ?? dashboardData?.character?.mana ?? 0) / (selectedCharacter?.maxMana ?? dashboardData?.character?.maxMana ?? 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Money */}
            <div className="mu-retro-card-blur" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Tiền tệ</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Tiền nhân vật:</span></p>
                  <p className="text-green-400 font-bold text-xs sm:text-base">{formatMoney(selectedCharacter?.money ?? dashboardData?.character?.money ?? 0)} Zen</p>
                  <p className="text-white text-xs sm:text-base"><span className="text-gray-400">Tiền kho:</span></p>
                  <p className="text-green-400 font-bold text-xs sm:text-base">{formatMoney(dashboardData?.warehouse?.money ?? 0)} Zen</p>
                </div>
              </div>
            </div>

          </div>

          {/* Reset Info - Full Width Layout */}
          <div className="mu-retro-card-blur mb-6 sm:mb-8" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
            <div className="relative z-10">
              <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold flex items-center">
                Reset
              </h3>
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Reset Thường */}
              <div className="bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <h4 className="text-sm sm:text-lg font-semibold text-blue-400 mb-2 sm:mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                  Reset Thường
                </h4>
                
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Daily:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-blue-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.dailyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Weekly:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-blue-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.weeklyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Monthly:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-blue-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.monthlyReset || 0}
                    </span>
                  </div>
                  <div className="pt-1.5 sm:pt-2 border-t border-blue-500/20 text-center">
                    <span className="text-xs sm:text-sm text-gray-400">Tổng: </span>
                    <span className="text-sm sm:text-lg font-bold text-blue-300 hover:text-blue-200 transition-colors duration-200">
                      {dashboardData?.reset.totalResetCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Master Reset */}
              <div className="bg-purple-900/20 rounded-lg p-3 sm:p-4 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h4 className="text-sm sm:text-lg font-semibold text-purple-400 mb-2 sm:mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                  Master Reset
                </h4>
                
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Daily:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-purple-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterDailyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Weekly:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-purple-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterWeeklyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-400">Monthly:</span>
                    <span className="text-sm sm:text-lg font-bold text-white bg-purple-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterMonthlyReset || 0}
                    </span>
                  </div>
                  <div className="pt-1.5 sm:pt-2 border-t border-purple-500/20 text-center">
                    <span className="text-xs sm:text-sm text-gray-400">Tổng: </span>
                    <span className="text-sm sm:text-lg font-bold text-purple-300 hover:text-purple-200 transition-colors duration-200">
                      {dashboardData?.reset.totalMasterResetCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lần Reset Cuối */}
              <div className="bg-green-900/20 rounded-lg p-3 sm:p-4 border border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                <h4 className="text-sm sm:text-lg font-semibold text-green-400 mb-2 sm:mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                  Lần Reset Cuối
                </h4>
                
                <div className="space-y-1.5 sm:space-y-2">
                  {dashboardData?.reset.lastDailyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-400">Daily:</span>
                      <span className="text-xs sm:text-sm font-medium text-green-300 bg-green-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastDailyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {dashboardData?.reset.lastWeeklyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-400">Weekly:</span>
                      <span className="text-xs sm:text-sm font-medium text-green-300 bg-green-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastWeeklyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {dashboardData?.reset.lastMonthlyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-400">Monthly:</span>
                      <span className="text-xs sm:text-sm font-medium text-green-300 bg-green-800/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastMonthlyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {!dashboardData?.reset.lastDailyReset && !dashboardData?.reset.lastWeeklyReset && !dashboardData?.reset.lastMonthlyReset && (
                    <div className="text-center text-gray-500 text-xs sm:text-sm py-3 sm:py-4">
                      Chưa có dữ liệu reset
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Guild Info */}
          {dashboardData?.guild && (
            <div className="mu-retro-card-blur mb-6 sm:mb-8" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Thông tin Guild</h3>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex justify-between items-center py-1.5 sm:py-2">
                      <span className="text-gray-300 text-xs sm:text-sm">Tên Guild:</span>
                      <span className="text-white font-semibold text-xs sm:text-base">{dashboardData.guild.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 sm:py-2">
                      <span className="text-gray-300 text-xs sm:text-sm">Guild Master:</span>
                      <span className="text-white font-semibold text-xs sm:text-base">{dashboardData.guild.master}</span>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex justify-between items-center py-1.5 sm:py-2">
                      <span className="text-gray-300 text-xs sm:text-sm">Điểm số:</span>
                      <span className="text-white font-semibold text-xs sm:text-base">{formatMoney(dashboardData.guild.score)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 sm:py-2">
                      <span className="text-gray-300 text-xs sm:text-sm">Số thành viên:</span>
                      <span className="text-white font-semibold text-xs sm:text-base">{dashboardData.guild.memberCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="mu-retro-card-blur text-center" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Bắt đầu chơi</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg">Tải game và bắt đầu hành trình Mu Online</p>
                <a 
                  href="/download" 
                  className="mu-retro-btn-classic inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                >
                  TẢI GAME NGAY
                </a>
              </div>
            </div>

            <div className="mu-retro-card-blur text-center" style={{ padding: '20px 30px 20px 30px', paddingTop: '24px' }}>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl mu-retro-title-small mb-3 sm:mb-4 mu-text-gold">Thông tin server</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg">Xem thông tin chi tiết về server và cài đặt</p>
                <a 
                  href="/info" 
                  className="mu-retro-btn inline-block text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-3"
                >
                  XEM THÔNG TIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>



      {/* Account Management Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="mu-modal-bg rounded-lg p-3 sm:p-6 w-full max-w-md relative overflow-hidden">
            <div className="mu-modal-content">
            <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4 mu-text-gold leading-tight">Quản lý tài khoản</h3>
            
            <div className="space-y-2 sm:space-y-4">
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Tên hiển thị:</label>
                <input
                  type="text"
                  defaultValue={user?.memb_name || ''}
                  id="memb_name"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Email:</label>
                <input
                  type="email"
                  id="mail_addr"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phon_numb"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:space-x-0 pt-1 sm:pt-4">
                <button
                  onClick={() => {
                    const updateData = {
                      memb_name: (document.getElementById('memb_name') as HTMLInputElement)?.value,
                      mail_addr: (document.getElementById('mail_addr') as HTMLInputElement)?.value,
                      phon_numb: (document.getElementById('phon_numb') as HTMLInputElement)?.value,
                    };
                    handleUpdateAccount(updateData);
                  }}
                  disabled={updateLoading}
                  className="mu-retro-btn flex-1 disabled:opacity-50 text-xs sm:text-base py-2 sm:py-3 leading-tight"
                >
                  {updateLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
                
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="mu-retro-btn flex-1 text-xs sm:text-base py-2 sm:py-3 leading-tight"
                >
                  Đổi mật khẩu
                </button>
              </div>
              
              <button
                onClick={() => setShowAccountModal(false)}
                className="mu-retro-btn w-full text-xs sm:text-base py-2 sm:py-3 leading-tight"
                style={{ background: 'linear-gradient(135deg, #666 0%, #444 100%)' }}
              >
                Đóng
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="mu-modal-bg rounded-lg p-3 sm:p-6 w-full max-w-md relative overflow-hidden">
            <div className="mu-modal-content">
            <h3 className="text-base sm:text-xl mu-retro-title-small mb-2 sm:mb-4 mu-text-gold leading-tight">Đổi mật khẩu</h3>
            
            <div className="space-y-2 sm:space-y-4">
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  id="currentPassword"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Mật khẩu mới:</label>
                <input
                  type="password"
                  id="newPassword"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight">Xác nhận mật khẩu mới:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mu-retro-input w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:space-x-0 pt-1 sm:pt-4">
                <button
                  onClick={() => {
                    const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement)?.value;
                    const newPassword = (document.getElementById('newPassword') as HTMLInputElement)?.value;
                    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement)?.value;
                    
                    if (newPassword !== confirmPassword) {
                      alert('Mật khẩu xác nhận không khớp!');
                      return;
                    }
                    
                    handleChangePassword({ currentPassword, newPassword });
                  }}
                  disabled={updateLoading}
                  className="mu-retro-btn flex-1 disabled:opacity-50 text-xs sm:text-base py-2 sm:py-3 leading-tight"
                >
                  {updateLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                </button>
                
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="mu-retro-btn flex-1 text-xs sm:text-base py-2 sm:py-3 leading-tight"
                  style={{ background: 'linear-gradient(135deg, #666 0%, #444 100%)' }}
                >
                  Hủy
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

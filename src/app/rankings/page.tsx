'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RankingTable from '@/components/RankingTable';
import GuildRankingTable from '@/components/GuildRankingTable';

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<'characters' | 'guilds'>('characters');
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
        {/* Main Content */}
        <main className="relative z-10 py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-14">
            <h1 className="text-2xl sm:text-5xl mu-retro-title mb-2 sm:mb-4">
              Bảng Xếp Hạng MuOnline
            </h1>
            <p className="text-sm sm:text-xl text-gray-300">
              Top players và guilds của server
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-1 flex w-full max-w-md border border-gray-700/50">
              <button
                onClick={() => setActiveTab('characters')}
                className={`flex-1 px-2 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base ${
                  activeTab === 'characters'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-black/60'
                }`}
              >
                Top Resets
              </button>
              <button
                onClick={() => setActiveTab('guilds')}
                className={`flex-1 px-2 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base ${
                  activeTab === 'guilds'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-black/60'
                }`}
              >
                Top Guilds
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Character Rankings */}
            {activeTab === 'characters' && (
              <RankingTable
                title="Top 100 Resets"
                endpoint="level"
              />
            )}

            {/* Guild Rankings */}
            {activeTab === 'guilds' && (
              <GuildRankingTable
                title="Top 50 Guilds"
                endpoint="guild"
              />
            )}
          </div>

          <div className="mt-4 sm:mt-8 bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-8 max-w-6xl mx-auto border border-gray-700/50">
            <h3 className="text-base sm:text-xl mu-retro-title-small mb-4 sm:mb-6 text-center">
              Thông tin về Ranking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-lg text-gray-300" style={{ marginTop: '20px' }}>
              <div>
                <h4 className="font-bold mu-text-gold mb-2 sm:mb-3 text-xs sm:text-base">Top Resets:</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Xếp hạng dựa trên tổng số resets của nhân vật</li>
                  <li>• Hiển thị top 100 người chơi đầu tiên</li>
                  <li>• Chỉ tính các nhân vật có CtlCode &lt; 8 hoặc NULL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mu-text-gold mb-2 sm:mb-3 text-xs sm:text-base">Top Guilds:</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Xếp hạng dựa trên điểm số guild (G_Score)</li>
                  <li>• Hiển thị top 50 guild đầu tiên</li>
                  <li>• Bao gồm Guild Master và số thành viên</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

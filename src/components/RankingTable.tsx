'use client';

import { useState, useEffect } from 'react';

interface CharacterRank {
  account: string;
  character: string;
  class: number;
  resets: number;
  level?: number;
  pkcount?: number;
}

interface RankingTableProps {
  title: string;
  endpoint: string;
}

const classNames: { [key: number]: string } = {
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
  81: 'Fist Master',
  96: 'Grow Lancer',
  97: 'Mirage Lancer'
};

export default function RankingTable({ title, endpoint }: RankingTableProps) {
  const [characters, setCharacters] = useState<CharacterRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const fetchRankings = async (searchName?: string) => {
    try {
      setLoading(true);
      setIsSearching(!!searchName);
      
      const url = searchName 
        ? `/api/characters/search?name=${encodeURIComponent(searchName)}`
        : `/api/rankings/${endpoint}`;
        
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setCharacters(data.data);
        setIsSearchMode(!!searchName);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu ranking');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [endpoint]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchRankings(searchTerm.trim());
    } else {
      fetchRankings();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearchMode(false);
    fetchRankings();
  };

  const getClassName = (classId: number) => {
    return classNames[classId] || `Class ${classId}`;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (loading) {
    return (
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50">
        <h2 className="text-2xl mu-retro-title-small mb-4 text-center">{title}</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50">
        <h2 className="text-2xl mu-retro-title-small mb-4 text-center">{title}</h2>
        <div className="text-red-400 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50">
      <h2 className="text-2xl mu-retro-title-small mb-6 text-center">{title}</h2>
      
      {/* Search Box */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tên nhân vật..."
            className="mu-retro-input flex-1 px-4 py-2 text-white"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="mu-retro-btn px-6 py-2 disabled:opacity-50"
          >
            {isSearching ? '🔍' : 'Tìm kiếm'}
          </button>
          {isSearchMode && (
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-lg font-medium transition-colors border border-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        {isSearchMode && (
          <p className="text-sm text-gray-400">
            🔍 Đang hiển thị kết quả tìm kiếm cho &quot;{searchTerm}&quot; ({characters.length} kết quả)
          </p>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="border-b" style={{ borderColor: '#FFD700' }}>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Hạng</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Nhân vật</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Class</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Resets</th>
              {isSearchMode && (
                <>
                  <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Level</th>
                  <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">PK</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {characters.map((char, index) => (
              <tr key={`${char.account}-${char.character}`} className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                <td className="py-4 px-4 mu-text-gold font-bold text-lg">
                  {isSearchMode ? `#${index + 1}` : getRankIcon(index)}
                </td>
                <td className="py-4 px-4 text-white font-medium text-lg">
                  {char.character}
                </td>
                <td className="py-4 px-4 text-blue-300 text-lg">
                  {getClassName(char.class)}
                </td>
                <td className="py-4 px-4 text-purple-300 font-bold text-lg">
                  {char.resets.toLocaleString()}
                </td>
                {isSearchMode && (
                  <>
                    <td className="py-4 px-4 text-green-300 text-lg">
                      {char.level || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-red-300 text-lg">
                      {char.pkcount || 'N/A'}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {characters.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          {isSearchMode ? `Không tìm thấy nhân vật nào với tên "${searchTerm}"` : 'Chưa có dữ liệu ranking'}
        </div>
      )}
    </div>
  );
}

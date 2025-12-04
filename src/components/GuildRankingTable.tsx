'use client';

import { useState, useEffect } from 'react';

interface GuildRank {
  guildName: string;
  score: number;
  guildMaster: string;
  memberCount: number;
  guildMark?: string | null;
}

interface GuildRankingTableProps {
  title: string;
  endpoint: string;
}

export default function GuildRankingTable({ title, endpoint }: GuildRankingTableProps) {
  const [guilds, setGuilds] = useState<GuildRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingSample, setIsAddingSample] = useState(false);

  const fetchGuildRankings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rankings/${endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        setGuilds(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu guild ranking');
    } finally {
      setLoading(false);
    }
  };

  const addSampleGuilds = async () => {
    try {
      setIsAddingSample(true);
      const response = await fetch('/api/guilds/sample', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        // Reload data after adding samples
        await fetchGuildRankings();
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (err) {
      alert('Lỗi khi thêm dữ liệu mẫu');
    } finally {
      setIsAddingSample(false);
    }
  };

  useEffect(() => {
    fetchGuildRankings();
  }, [endpoint]);

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getGuildLogo = (guildName: string) => {
    if (!guildName) return null;
    
    // Tạo logo đơn giản từ tên guild
    const firstLetter = guildName.charAt(0).toUpperCase();
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-purple-500', 'bg-yellow-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'
    ];
    const colorIndex = guildName.length % colors.length;
    
    return (
      <div className={`w-8 h-8 ${colors[colorIndex]} rounded flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
        {firstLetter}
      </div>
    );
  };

  const formatValue = (value: number | string) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value.toString();
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
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="border-b" style={{ borderColor: '#FFD700' }}>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Hạng</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Logo</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Tên Guild</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Guild Master</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Thành viên</th>
              <th className="text-left py-4 px-4 mu-text-gold font-bold text-lg">Điểm số</th>
            </tr>
          </thead>
          <tbody>
            {guilds.map((guild, index) => (
              <tr key={guild.guildName} className="border-b border-gray-700/50 hover:bg-black/20 transition-colors">
                <td className="py-4 px-4 mu-text-gold font-bold text-lg">
                  {getRankIcon(index)}
                </td>
                <td className="py-4 px-4">
                  {getGuildLogo(guild.guildName)}
                </td>
                <td className="py-4 px-4 text-white font-medium text-lg">
                  {guild.guildName || 'Unknown'}
                </td>
                <td className="py-4 px-4 text-blue-300 text-lg">
                  {guild.guildMaster || 'Unknown'}
                </td>
                <td className="py-4 px-4 text-green-300 text-lg">
                  {formatValue(guild.memberCount)}
                </td>
                <td className="py-4 px-4 text-purple-300 font-bold text-lg">
                  {formatValue(guild.score)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {guilds.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <div className="mb-4">
            <div className="text-6xl mb-2">🏰</div>
            <p className="text-lg font-medium">Chưa có dữ liệu guild</p>
            <p className="text-sm mt-2 mb-4">Có thể database chưa có guild nào hoặc dữ liệu chưa được cập nhật</p>
            <button
              onClick={addSampleGuilds}
              disabled={isAddingSample}
              className="mu-retro-btn px-6 py-2 disabled:opacity-50"
            >
              {isAddingSample ? 'Đang thêm...' : '➕ Thêm dữ liệu mẫu'}
            </button>
          </div>
        </div>
      )}
      
      {guilds.length > 0 && (
        <div className="mt-4 text-center text-gray-400 text-sm">
          Hiển thị {guilds.length} guild đầu tiên
        </div>
      )}
    </div>
  );
}

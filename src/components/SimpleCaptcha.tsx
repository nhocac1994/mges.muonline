'use client';

import { useState, useEffect, useCallback } from 'react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setUserInput('');
    setIsValid(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    const valid = value === captcha;
    setIsValid(valid);
    onVerify(valid);
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
      <label className="block text-white font-semibold mb-2 mu-text-gold">Mã xác thực *</label>
      <div className="flex items-center space-x-4 mb-3">
        <div className="bg-white p-3 rounded border-2 border-[#FFD700] text-black font-bold text-lg tracking-widest min-w-[120px] text-center shadow-lg" style={{
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
        }}>
          {captcha}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="mu-retro-btn px-3 py-2 text-sm"
        >
          🔄
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Nhập mã xác thực"
        className="mu-retro-input w-full"
        maxLength={5}
      />
      {userInput && !isValid && (
        <p className="mu-text-red text-sm mt-1">Mã xác thực không đúng</p>
      )}
      {isValid && (
        <p className="text-green-400 text-sm mt-1">✓ Mã xác thực đúng</p>
      )}
    </div>
  );
}

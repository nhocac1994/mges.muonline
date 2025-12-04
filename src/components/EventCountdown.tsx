'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

interface Event {
  name: string;
  duration: number; // in minutes
  color: string;
  bgColor: string;
  borderColor: string; // hex color code
  schedule: (hour: number, minute: number) => boolean; // Function to check if event should run
}

const events: Event[] = [
  { 
    name: '[Chaos Castle]', 
    duration: 10, 
    color: 'mu-text-red', 
    bgColor: 'rgba(204, 0, 0, 0.15)', 
    borderColor: '#CC0000',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 0 // Giờ lẻ: 1, 3, 5, 7, 9...
  },
  { 
    name: '[Devil Square]', 
    duration: 10, 
    color: 'mu-text-gold', 
    bgColor: 'rgba(255, 215, 0, 0.15)', 
    borderColor: '#FFD700',
    schedule: (hour, minute) => hour % 4 === 0 && minute === 0 // Giờ chẵn 4h 1 lần: 0, 4, 8, 12...
  },
  { 
    name: '[Blood Castle]', 
    duration: 10, 
    color: 'mu-text-orange', 
    bgColor: 'rgba(255, 102, 0, 0.15)', 
    borderColor: '#FF6600',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 0 // Giờ chẵn 2h 1 lần: 0, 2, 4, 6, 8...
  },
  { 
    name: 'Vua Xuong', 
    duration: 10, 
    color: 'mu-text-gold', 
    bgColor: 'rgba(255, 165, 0, 0.2)', 
    borderColor: '#FFA500',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 5 // Giờ chẵn 2h05: 0:05, 2:05, 4:05...
  },
  { 
    name: 'Rong Do', 
    duration: 10, 
    color: 'mu-text-red', 
    bgColor: 'rgba(153, 0, 0, 0.15)', 
    borderColor: '#990000',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 30 // Giờ lẻ 1h30: 1:30, 3:30, 5:30...
  },
  { 
    name: 'Rong Vang', 
    duration: 10, 
    color: 'mu-text-gold', 
    bgColor: 'rgba(255, 215, 0, 0.12)', 
    borderColor: '#FFD700',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 30 // Giờ chẵn 2h30: 2:30, 4:30...
  },
  { 
    name: 'Binh Doan Phu Thuy', 
    duration: 10, 
    color: 'mu-text-orange', 
    bgColor: 'rgba(255, 102, 0, 0.15)', 
    borderColor: '#FF6600',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 0 // Giờ lẻ 2h 1 lần: 1, 3, 5, 7...
  },
  { 
    name: 'Cursed King', 
    duration: 10, 
    color: 'mu-text-gold', 
    bgColor: 'rgba(255, 215, 0, 0.15)', 
    borderColor: '#FFD700',
    schedule: (hour, minute) => (hour === 13 && minute === 0) || (hour === 20 && minute === 45) // 13:00 và 20:45
  },
  { 
    name: 'Kundun Arena Event', 
    duration: 10, 
    color: 'mu-text-orange', 
    bgColor: 'rgba(255, 165, 0, 0.15)', 
    borderColor: '#FFA500',
    schedule: (hour, minute) => (hour === 11 && minute === 30) || (hour === 19 && minute === 30) || (hour === 21 && minute === 15) // 11:30, 19:30, 21:15
  },
  { 
    name: 'Erohim', 
    duration: 10, 
    color: 'mu-text-red', 
    bgColor: 'rgba(204, 0, 0, 0.15)', 
    borderColor: '#CC0000',
    schedule: (hour, minute) => (hour === 12 && minute === 30) || (hour === 20 && minute === 15) || (hour === 21 && minute === 45) // 12:30, 20:15, 21:45
  },
];

const EventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { isSupported, permission, requestPermission, showEventNotification } = useNotifications();
  const notificationSent = useRef<{ [key: string]: { fiveMin: boolean; started: boolean } }>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      const newTimeLeft: { [key: string]: number } = {};
      
      events.forEach((event) => {
        // Check if event is currently running
        if (event.schedule(currentHour, currentMinute) && currentSecond < event.duration * 60) {
          // Event is currently running - show remaining time
          const totalEventSeconds = event.duration * 60; // Total event duration in seconds (10 minutes = 600 seconds)
          const remainingSeconds = totalEventSeconds - currentSecond;
          newTimeLeft[event.name] = Math.max(0, remainingSeconds);
          
          // Send notification when event starts (only once per event)
          if (notificationsEnabled && permission.granted && !notificationSent.current[event.name]?.started) {
            showEventNotification(event.name, 0, true);
            notificationSent.current[event.name] = {
              ...notificationSent.current[event.name],
              started: true
            };
          }
        } else {
          // Find next occurrence
          let nextEventTime = null;
          
          // Check today's remaining hours
          for (let hour = currentHour; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute++) {
              if (event.schedule(hour, minute)) {
                const eventTime = new Date();
                eventTime.setHours(hour, minute, 0, 0);
                
                const timeDiff = eventTime.getTime() - now.getTime();
                if (timeDiff > 0) {
                  nextEventTime = timeDiff / 1000;
                  break;
                }
              }
            }
            if (nextEventTime) break;
          }
          
          // If no event today, check tomorrow
          if (!nextEventTime) {
            for (let hour = 0; hour < 24; hour++) {
              for (let minute = 0; minute < 60; minute++) {
                if (event.schedule(hour, minute)) {
                  const eventTime = new Date();
                  eventTime.setDate(eventTime.getDate() + 1);
                  eventTime.setHours(hour, minute, 0, 0);
                  
                  const timeDiff = eventTime.getTime() - now.getTime();
                  if (timeDiff > 0) {
                    nextEventTime = timeDiff / 1000;
                    break;
                  }
                }
              }
              if (nextEventTime) break;
            }
          }
          
          newTimeLeft[event.name] = nextEventTime || 0;
          
          // Send notification 5 minutes before event starts (only once per event)
          if (notificationsEnabled && permission.granted && nextEventTime && nextEventTime <= 300) {
            if (!notificationSent.current[event.name]?.fiveMin) {
              showEventNotification(event.name, nextEventTime, false);
              notificationSent.current[event.name] = {
                ...notificationSent.current[event.name],
                fiveMin: true
              };
            }
          }
          
          // Reset notification flags when event is far away (more than 10 minutes)
          if (nextEventTime && nextEventTime > 600) {
            notificationSent.current[event.name] = {
              fiveMin: false,
              started: false
            };
          }
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [notificationsEnabled, permission.granted, showEventNotification]);

  // Initialize notifications on component mount and auto-request permission
  useEffect(() => {
    if (isSupported) {
      if (permission.granted) {
        setNotificationsEnabled(true);
        // Show welcome notification when permission is first granted
        showEventNotification('Chào mừng!', 0, false);
      } else if (permission.default) {
        // Auto-request permission when page loads
        requestPermission();
      } else {
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
    }
  }, [isSupported, permission, requestPermission, showEventNotification]);

  // Register for background sync
  useEffect(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // Register for background sync
        (registration as any).sync.register('background-sync').catch((err: any) => {
          console.log('Background sync registration failed:', err);
        });
      });
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDotColor = (event: Event): string => {
    const timeLeftForEvent = timeLeft[event.name] || 0;
    if (timeLeftForEvent <= 300) return 'bg-[#CC0000]'; // 5 minutes - red
    if (timeLeftForEvent <= 900) return 'bg-[#FFD700]'; // 15 minutes - gold
    return 'bg-[#FFA500]'; // orange
  };

  const isEventRunning = (event: Event): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Check if event is currently running
    if (event.schedule(currentHour, currentMinute)) {
      // Event is running if we're within the duration
      return currentSecond < event.duration * 60;
    }
    
    return false;
  };


  return (
    <div className="space-y-2 sm:space-y-4">
      {/* Events List */}
      <div className="space-y-2 sm:space-y-5">
        {events.map((event, index) => (
        <div 
          key={index}
            className="py-2 sm:py-6 px-0 sm:px-5"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none'
            }}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-5">
            <div className="flex items-center gap-2 sm:gap-2 flex-1 min-w-0">
              <div className={`w-2 h-2 sm:w-4 sm:h-4 ml-2 sm:ml-0 ${getDotColor(event)} rounded-full animate-pulse flex-shrink-0`}></div>
              <span className="mu-text-gold font-semibold text-xs sm:text-lg truncate ml-2 sm:ml-0 sm:mt-0">
                {event.name}
                {isEventRunning(event) && <span className="mu-text-orange ml-1 sm:ml-2 text-[10px] sm:text-base hidden sm:inline">(Đang diễn ra)</span>}
              </span>
            </div>
            <div className={`${event.color} font-mono text-xs sm:text-xl mr-5 sm:mr-0 font-bold flex-shrink-0`}>
              {formatTime(timeLeft[event.name] || 0)}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;

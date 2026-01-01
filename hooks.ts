import React, { useState, useEffect, useRef } from 'react';
import { Notification } from './types';
import { APIService } from './services/api';

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const fetchAndSetNotifications = async () => {
      const data = await APIService.fetchNotifications(userId);
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read && n.isVisible).length);
    };
    fetchAndSetNotifications();

    const interval = setInterval(fetchAndSetNotifications, 60000);
    return () => clearInterval(interval);
  }, [userId]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAsRead, clearNotification, clearAllNotifications };
};

export const useRealtimeDataStream = <T,>(dataSourceUrl: string, initialData: T[] = []) => {
  const [data, setData] = useState<T[]>(initialData);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // In a real app this would connect to a real WS
    // socketRef.current = new WebSocket(dataSourceUrl);
    // ... impl
    return () => {
      socketRef.current?.close();
    };
  }, [dataSourceUrl]);

  return data;
};

// Fixed: Imported React above to support React.RefObject type usage here
export const useOutsideClick = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
import { useState, useEffect, useRef } from 'react';
import { DeviceEventEmitter, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { NotificationModule } = NativeModules;

export const useNavigationLogic = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const lastUpdateRef = useRef({ title: '', body: '', time: 0 });

  useEffect(() => {
    loadHistory();
    const mapsSub = DeviceEventEmitter.addListener('onMapsNotification', (event) => {
      setIsSessionActive(true);
      const now = Date.now();
      const { 'android.title': title, 'android.text': body } = event;

      if (title !== lastUpdateRef.current.title || now - lastUpdateRef.current.time > 60000) {
        const newNotif = { id: now.toString(), title, body, timestamp: now };
        setNotifications(prev => [newNotif, ...prev]);
        NotificationModule.triggerLocalNotification(title, body);
        lastUpdateRef.current = { title, body, time: now };
      }
    });

    const removeSub = DeviceEventEmitter.addListener('onNotificationRemoved', () => saveSessionToHistory());
    return () => { mapsSub.remove(); removeSub.remove(); };
  }, [notifications, history]);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('nav_history');
    if (data) setHistory(JSON.parse(data));
  };

  const saveSessionToHistory = async () => {
    if (notifications.length === 0) return;
    const session = { id: Date.now().toString(), timestamp: new Date().toLocaleString(), cards: notifications };
    const newHistory = [session, ...history];
    setHistory(newHistory);
    setNotifications([]);
    setIsSessionActive(false);
    await AsyncStorage.setItem('nav_history', JSON.stringify(newHistory));
  };

  const deleteHistoryItem = async (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    await AsyncStorage.setItem('nav_history', JSON.stringify(updated));
  };

  return { notifications, history, isSessionActive, saveSessionToHistory, deleteHistoryItem };
};
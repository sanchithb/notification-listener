import { create } from 'zustand';
import { DeviceEventEmitter, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { NotificationModule } = NativeModules;

// Variables outside the store to persist across state changes without triggering re-renders
let lastUpdateText = { title: '', body: '' };
let lastUpdateTime = 0;
let lastFiveMinTime = 0;

interface NavState {
  notifications: any[];
  history: any[];
  isSessionActive: boolean;
  initListener: () => void;
  saveSessionToHistory: () => Promise<void>;
  deleteHistoryItem: (id: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  mutedPhrases: string[];
  addMutedPhrase: (phrase: string) => void;
  deleteMutedPhrase: (phrase: string) => void;
}

export const useNavStore = create<NavState>((set, get) => ({
  notifications: [],
  history: [],
  isSessionActive: false,

  mutedPhrases: [],

  loadHistory: async () => {
    const data = await AsyncStorage.getItem('nav_history');
    const muted = await AsyncStorage.getItem('muted_phrases'); // Load muted too
    if (data) set({ history: JSON.parse(data) });
    if (muted) set({ mutedPhrases: JSON.parse(muted) });
  },

  addMutedPhrase: async (phrase: string) => {
    const updated = [...get().mutedPhrases, phrase.toLowerCase()];
    set({ mutedPhrases: updated });
    await AsyncStorage.setItem('muted_phrases', JSON.stringify(updated));
  },

  deleteMutedPhrase: async (phrase: string) => {
    const updated = get().mutedPhrases.filter(p => p !== phrase);
    set({ mutedPhrases: updated });
    await AsyncStorage.setItem('muted_phrases', JSON.stringify(updated));
  },

  initListener: () => {
    DeviceEventEmitter.addListener('onMapsNotification', (event) => {
      const { 
        'android.title': title, 
        'android.text': body, 
        'android.subText': subText // Usually holds "15 min • 4.2 miles • 10:30 PM"
      } = event;

      const fullText = `${title} ${body}`.toLowerCase();
      const isMuted = get().mutedPhrases.some(phrase => fullText.includes(phrase));

      if (isMuted) return; // Stop here if keyword is found!

      const now = Date.now();
      const timeDiff = now - lastUpdateTime;
      const isDifferent = title !== lastUpdateText.title || body !== lastUpdateText.body;

      // 1. DUPLICATE & 1-MINUTE LOGIC
      // Update if: It's new info OR it's been more than 60 seconds
      if (isDifferent || timeDiff > 60000) {
        const newNotif = { id: now.toString(), title, body, timestamp: now };
        
        set((state) => ({
          isSessionActive: true,
          notifications: [newNotif, ...state.notifications]
        }));

        NotificationModule.triggerLocalNotification(title, body);
        
        // Update trackers
        lastUpdateText = { title, body };
        lastUpdateTime = now;
      }

      // 2. THE 5-MINUTE ETA RULE
      // Every 5 minutes, parse the subText to create a summary card
      if (now - lastFiveMinTime > 300000) { // 300,000ms = 5 mins
        if (subText) {
          const parts = subText.split('·').map(p => p.trim());
          // Assuming format: "20 min · 5 miles · 6:00 PM"
          const summaryNotif = {
            id: `summary-${now}`,
            title: `${parts[0] || 'Progress'} • ${parts[1] || ''}`,
            body: `Expected Arrival: ${parts[2] || 'Calculating...'}`,
            timestamp: now,
            isSummary: true // Flag to style differently if you wish
          };

          set((state) => ({
            notifications: [summaryNotif, ...state.notifications]
          }));

          lastFiveMinTime = now;

          NotificationModule.triggerLocalNotification(summaryNotif.title, summaryNotif.body);
        }
      }
    });

    DeviceEventEmitter.addListener('onNotificationRemoved', () => get().saveSessionToHistory());
  },

  loadHistory: async () => {
    const data = await AsyncStorage.getItem('nav_history');
    if (data) set({ history: JSON.parse(data) });
  },

//   initListener: () => {
//     DeviceEventEmitter.addListener('onMapsNotification', (event) => {
//       const { 'android.title': title, 'android.text': body } = event;
//       const now = Date.now();

//       set((state) => ({
//         isSessionActive: true,
//         notifications: [{ id: now.toString(), title, body, timestamp: now }, ...state.notifications]
//       }));
      
//       NotificationModule.triggerLocalNotification(title, body);
//     });

//     DeviceEventEmitter.addListener('onNotificationRemoved', () => get().saveSessionToHistory());
//   },

  saveSessionToHistory: async () => {
    const { notifications, history } = get();
    if (notifications.length === 0) return;

    const session = { id: Date.now().toString(), timestamp: new Date().toLocaleString(), cards: notifications };
    const newHistory = [session, ...history];

    set({ history: newHistory, notifications: [], isSessionActive: false });
    await AsyncStorage.setItem('nav_history', JSON.stringify(newHistory));
  },

  deleteHistoryItem: async (id: string) => {
    const updated = get().history.filter(item => item.id !== id);
    set({ history: updated });
    await AsyncStorage.setItem('nav_history', JSON.stringify(updated));
  },
}));
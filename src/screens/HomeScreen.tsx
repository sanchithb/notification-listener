import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmationSheet from '../../components/ui/ConfirmationSheet';
import { styles } from '../styles/globalStyles';
import { useNavStore } from '../store/useNavStore';

const HistoryEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Icon name="history" size={80} color="#333" />
    <Text style={styles.emptyText}>History is a ghost town! 👻</Text>
    <Text style={styles.emptySubText}>
      Your past adventures will haunt this space once you finish a trip. 
      Time to hit the road!
    </Text>
  </View>
);

export default function HomeScreen({ route }) {
  const { notifications, history, isSessionActive, deleteHistoryItem, saveSessionToHistory } = useNavStore();
  const [subTab, setSubTab] = useState<'current' | 'history'>('current');
  const [sheet, setSheet] = useState({ visible: false, type: '', id: '' });

  const handleConfirmAction = () => {
    if (sheet.type === 'delete') deleteHistoryItem(sheet.id);
    else if (sheet.type === 'stop') saveSessionToHistory();
    setSheet({ visible: false, type: '', id: '' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setSubTab('current')} style={[styles.tabItem, subTab === 'current' && styles.activeTab]}>
          <Text style={[styles.tabText, subTab === 'current' && styles.activeTabText]}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSubTab('history')} style={[styles.tabItem, subTab === 'history' && styles.activeTab]}>
          <Text style={[styles.tabText, subTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      {subTab === 'current' ? (
        <View style={styles.containerInner}>
          {!isSessionActive ? (
            <View style={styles.emptyContainer}>
              <Icon name="map-marker-off-outline" size={80} color="#333" />
              <Text style={styles.emptyText}>Nothing to show</Text>
              <TouchableOpacity style={styles.mapsBtn} onPress={() => Linking.openURL('http://maps.google.com')}>
                <Icon name="google-maps" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Open Google Maps</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardBody}>{item.body}</Text>
                </View>
              )}
            />
          )}
          {/* FLOATING STOP BUTTON */}
          {isSessionActive && (
            <TouchableOpacity 
              style={styles.floatingStopButton} 
              onPress={() => setSheet({ visible: true, type: 'stop', id: '' })}
            >
              <Icon name="stop" size={30} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.containerInner}
          ListEmptyComponent={HistoryEmptyComponent}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>{item.timestamp}</Text>
                <Text style={styles.historySub}>{item.cards.length} updates logged</Text>
              </View>
              <TouchableOpacity onPress={() => setSheet({ visible: true, type: 'delete', id: item.id })}>
                <Icon name="trash-can-outline" size={24} color="#d01a3bff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <ConfirmationSheet 
        visible={sheet.visible}
        onClose={() => setSheet({ visible: false, type: '', id: '' })}
        onConfirm={handleConfirmAction}
        title={sheet.type === 'delete' ? "Delete History?" : "Stop Journey?"}
        desc={sheet.type === 'delete' ? "This will erase this trip permanently." : "Ready to end this session?"}
        btnText={sheet.type === 'delete' ? "Delete" : "Stop"}
        btnColor="#d01a3bff"
      />
    </View>
  );
}
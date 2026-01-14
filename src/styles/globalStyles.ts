import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  containerInner: { flex: 1, padding: 20 },
  tabBar: { flexDirection: 'row', backgroundColor: '#1E1E1E', margin: 15, borderRadius: 12, padding: 4 },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#2C2C2C' },
  tabText: { color: '#9AA0A6', fontWeight: '600' },
  activeTabText: { color: '#4285F4' },
  card: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 16, marginBottom: 12 },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cardBody: { color: '#9AA0A6', marginTop: 5 },
  historyCard: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  historyTitle: { color: '#E8EAED', fontSize: 14, fontWeight: 'bold' },
  historySub: { color: '#5F6368', fontSize: 12 },
  mapsBtn: { backgroundColor: '#4285F4', padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 },
  stopButton: { backgroundColor: '#d01a3bff', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  emptyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  emptySubText: { color: '#5F6368', fontSize: 14, textAlign: 'center', marginTop: 10 },
  sectionLabel: { color: '#4285F4', fontSize: 12, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#2C2C2C' },
  settingTextGroup: { marginLeft: 15 },
  settingTitle: { color: '#E8EAED', fontSize: 16 },
  settingSub: { color: '#5F6368', fontSize: 12 },

  // src/styles/globalStyles.ts

    floatingStopButton: {
        position: 'absolute',
        bottom: 20, // Distance from the bottom tab bar
        right: 20,  // Distance from the right edge
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#d01a3bff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 1000, // Ensure it stays above everything
    },
});
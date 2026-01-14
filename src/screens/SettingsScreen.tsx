import React from 'react';
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View, 
  Linking, 
  NativeModules 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/globalStyles';

const { NotificationModule } = NativeModules;

const TECH_FACTS = [
  "The first computer bug was a real moth found in a relay.",
  "Your smartphone has more power than NASA's 1969 moon computers.",
  "Google's original name was Backrub.",
  "90% of the world's currency is digital.",
  "The first hard drive only held 5MB of data.",
  "The first text message said 'Merry Christmas'."
];

export default function SettingsScreen({ navigation }) {
  
  const triggerTestNotification = () => {
    const randomFact = TECH_FACTS[Math.floor(Math.random() * TECH_FACTS.length)];
    NotificationModule.triggerLocalNotification("Tech Fact!", randomFact);
  };

  const openNotificationListenerSettings = () => {
    // Standard Android intent for Notification Access
    Linking.sendIntent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerInner}>
        
        <Text style={styles.sectionLabel}>PERMISSIONS</Text>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={() => Linking.openSettings()}
        >
          <Icon name="bell-outline" size={24} color="#9AA0A6" />
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Notification Permission</Text>
            <Text style={styles.settingSub}>Required for system alerts</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={openNotificationListenerSettings}
        >
          <Icon name="eye-outline" size={24} color="#9AA0A6" />
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Notification Access</Text>
            <Text style={styles.settingSub}>Required to read Google Maps info</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>FILTERS</Text>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={() => navigation.navigate('MutedPhrases')} // This will work now!
        >
          <Icon name="filter-variant" size={24} color="#9AA0A6" />
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Keyword Filters</Text>
            <Text style={styles.settingSub}>Mute specific roads or instructions</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>DEV / DEBUG</Text>

        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={() => navigation.navigate('DevInspector')} // This will work now!
        >
          <Icon name="filter-variant" size={24} color="#9AA0A6" />
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Dev Inspector</Text>
            <Text style={styles.settingSub}>View raw notification data</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>TOOLS</Text>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={triggerTestNotification}
        >
          <Icon name="flask-outline" size={24} color="#4285F4" />
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Test Notification</Text>
            <Text style={styles.settingSub}>Send a random tech fact to your tray</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={{ color: '#5F6368', fontSize: 12 }}>Version 1.0.0</Text>
        </View>
        
      </View>
    </ScrollView>
  );
}
import React from 'react';
// import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen'; // Create this similarly
import { useNavStore } from './src/store/useNavStore';
import { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MutedPhrasesScreen from './src/screens/MutedPhrasesScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import DevInspectorScreen from './src/screens/DevInspectorScreen';

const SettingsStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212', // Fixes the white flash between screens
  },
};

const Tab = createBottomTabNavigator();

function SettingsStackScreen({ navigation, route }) {

  React.useLayoutEffect(() => {

    const routeName = getFocusedRouteNameFromRoute(route);
    
    if (routeName === 'MutedPhrases') {

      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
    } else {

      navigation.getParent()?.setOptions({
        tabBarStyle: { 
          backgroundColor: '#1E1E1E', 
          borderTopWidth: 1, 
          borderTopColor: '#2C2C2C', 
          height: 70,
          paddingBottom: 10
        } 
      });
    }
    
  }, [navigation, route]);

  return (
    <SettingsStack.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#E1E1E1',
        headerTitleAlign: 'center'
      }}
    >
      <SettingsStack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }} 
      />
      <SettingsStack.Screen 
        name="MutedPhrases" 
        component={MutedPhrasesScreen} 
        options={{ title: 'Muted Keywords' }} 
      />
      <SettingsStack.Screen 
        name="DevInspector" 
        component={DevInspectorScreen} 
        options={{ title: 'DEV INSPECTOR' }} 
      />
    </SettingsStack.Navigator>
  );
}

const HomeTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home-variant" size={size} color={color} />
);

const SettingsTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="cog" size={size} color={color} />
);

export default function App() {
  const initListener = useNavStore(state => state.initListener);
  const loadHistory = useNavStore(state => state.loadHistory);

  useEffect(() => {
    loadHistory();
    initListener();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator 
          screenOptions={{

            headerStyle: { 
              backgroundColor: '#121212', 
              borderBottomWidth: 1, 
              borderBottomColor: '#2C2C2C',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: { 
              color: '#E1E1E1', 
              letterSpacing: 3, 
              fontSize: 16, 
              fontWeight: '700' 
            },
            headerTitleAlign: 'center',
            headerTitle: 'NAVIGATE',

            tabBarStyle: { 
              backgroundColor: '#1E1E1E', 
              borderTopWidth: 1, 
              borderTopColor: '#2C2C2C', 
              height: 70,
              paddingBottom: 10,
            },
            tabBarActiveTintColor: '#4285F4',
            tabBarInactiveTintColor: '#5F6368',
            tabBarShowLabel: true,

            headerShown: true,
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              tabBarIcon: HomeTabIcon,
            }}
          /> 
          {/* No more initialParams needed! */}
          <Tab.Screen 
            name="Settings" 
            component={SettingsStackScreen} 
            options={{
              tabBarIcon: SettingsTabIcon,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, DeviceEventEmitter, Image, StyleSheet } from 'react-native';

export default function DevInspectorScreen() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('onMapsNotification', (event) => {
      setLogs(prev => [{ time: new Date().toLocaleTimeString(), ...event }, ...prev].slice(0, 5));
    });
    return () => sub.remove();
  }, []);

  const RenderNode = ({ data, label, depth = 0 }: { data: any, label: string, depth?: number }) => {
    // Detect and display images
    if (typeof data === 'string' && data.startsWith('[BITMAP]')) {
      return (
        <View style={{ marginLeft: depth * 12, marginVertical: 4 }}>
          <Text style={s.label}>{label}:</Text>
          <Image 
            source={{ uri: `data:image/png;base64,${data.replace('[BITMAP]', '')}` }} 
            style={s.img} 
          />
        </View>
      );
    }

    // Recursively render nested objects (Bundles)
    if (data !== null && typeof data === 'object') {
      return (
        <View style={{ marginLeft: depth * 12, marginVertical: 4 }}>
          <Text style={s.folder}>📂 {label}</Text>
          {Object.entries(data).map(([k, v]) => (
            <RenderNode key={k} label={k} data={v} depth={depth + 1} />
          ))}
        </View>
      );
    }

    // Render simple values
    return (
      <View style={{ marginLeft: depth * 12 }}>
        <Text style={s.label}>{label}: <Text style={s.value}>{String(data)}</Text></Text>
      </View>
    );
  };

  return (
    <ScrollView style={s.container}>
      <Text style={s.header}>FULL NOTIFICATION DUMP</Text>
      {logs.map((log, i) => (
        <View key={i} style={s.card}>
          <Text style={s.time}>{log.time}</Text>
          <RenderNode label="Root Extras" data={log.extras} />
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  header: { color: '#4285F4', fontWeight: 'bold', fontSize: 16, marginBottom: 15 },
  card: { backgroundColor: '#1A1A1A', padding: 10, borderRadius: 8, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#4285F4' },
  time: { color: '#4285F4', fontWeight: 'bold', marginBottom: 8 },
  folder: { color: '#FBBC05', fontWeight: 'bold', fontSize: 12 },
  label: { color: '#8AB4F8', fontSize: 11 },
  value: { color: '#FFF', fontSize: 11 },
  img: { width: 50, height: 50, resizeMode: 'contain', backgroundColor: '#333' }
});
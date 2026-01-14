import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavStore } from '../store/useNavStore';
import { styles } from '../styles/globalStyles';

export default function MutedPhrasesScreen({ navigation }) {
  const [input, setInput] = useState('');
  const { mutedPhrases, addMutedPhrase, deleteMutedPhrase } = useNavStore();

  const handleAdd = () => {
    if (input.trim()) {
      addMutedPhrase(input.trim());
      setInput('');
    }
  };

  return (
    <View style={styles.container}>

        

      <View style={styles.containerInner}>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TextInput
            style={{ 
              flex: 1, backgroundColor: '#1E1E1E', color: '#FFF', 
              padding: 15, borderRadius: 12, marginRight: 10 
            }}
            placeholder="Add phrase (e.g. 'Main St')"
            placeholderTextColor="#5F6368"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleAdd} style={[styles.mapsBtn, { marginTop: 0, paddingHorizontal: 20 }]}>
            <Icon name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={mutedPhrases}
          keyExtractor={(item) => item}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon name="volume-off" size={60} color="#333" />
              <Text style={styles.emptyText}>No muted phrases</Text>
              <Text style={styles.emptySubText}>Add phrases like road names to skip them.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={[styles.historyCard, { marginBottom: 8 }]}>
              <Text style={{ color: '#FFF', flex: 1 }}>{item}</Text>
              <TouchableOpacity onPress={() => deleteMutedPhrase(item)}>
                <Icon name="close-circle" size={20} color="#d01a3bff" />
              </TouchableOpacity>
            </View>
          )}
        />

      </View>
    </View>
  );
}
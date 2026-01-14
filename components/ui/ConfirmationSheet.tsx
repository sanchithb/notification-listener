import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface ConfirmationSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  desc: string;
  btnText: string;
  btnColor: string;
}

const ConfirmationSheet = ({ 
  visible, 
  onClose, 
  onConfirm, 
  title, 
  desc, 
  btnText, 
  btnColor 
}: ConfirmationSheetProps) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={styles.sheetOverlay} onPress={onClose}>
      <Pressable style={styles.sheetContainer}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>{title}</Text>
        <Text style={styles.sheetDesc}>{desc}</Text>
        
        <TouchableOpacity 
          style={[styles.md3Btn, { backgroundColor: btnColor }]} 
          onPress={onConfirm}
        >
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sheetCancel} onPress={onClose}>
          <Text style={styles.sheetCancelText}>Cancel</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  sheetOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'flex-end' 
  },
  sheetContainer: { 
    backgroundColor: '#1A1A1A', 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    padding: 24, 
    paddingBottom: 40 
  },
  sheetHandle: { 
    width: 40, 
    height: 4, 
    backgroundColor: '#333', 
    alignSelf: 'center', 
    borderRadius: 2, 
    marginBottom: 20 
  },
  sheetTitle: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  sheetDesc: { 
    color: '#9AA0A6', 
    fontSize: 14, 
    marginBottom: 30, 
    lineHeight: 20 
  },
  md3Btn: { 
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  btnText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  sheetCancel: { 
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  sheetCancelText: { 
    color: '#9AA0A6', 
    fontWeight: 'bold' 
  }
});

export default ConfirmationSheet;
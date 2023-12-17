// FilePicker.tsx
import React, { useState } from 'react';
import { Appearance, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FilePickerProps } from './types';
import IconButton from './IconButton';
import GlobalStyles from './GlobalStyles';

function FilePicker(props: FilePickerProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const colorScheme = Appearance.getColorScheme();

  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result[0].name?.endsWith(".gpx")) {
        setSelectedFile(result[0]);
      } else {
        ToastAndroid.show("Vyberte prosím soubor s příponou .gpx",ToastAndroid.SHORT);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        ToastAndroid.show("Nastala chyba během výběru souboru",ToastAndroid.SHORT);
      }
    }
  };

  return (
    <>
      <Pressable style={[GlobalStyles.formField, styles.iconButton]} onPress={pickDocument}>
        <Icon name="file-upload" size={25}/>
        <Text>Vybrat .gpx soubor s trasou</Text>
      </Pressable> 
      {selectedFile && (
        <>
          <Text style={[GlobalStyles.formField, {color: (colorScheme == "dark" ? "white" : "black")}]}>Vybraný soubor: {selectedFile.name}</Text>
          <IconButton icon="check" text="Importovat trasu" onPress={() => props.uploadDocument(selectedFile)}></IconButton>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    height: 40,
    borderWidth: 1,
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 100
  }
});

export default FilePicker;

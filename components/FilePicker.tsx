import React, { useState } from 'react';
import { Appearance, ToastAndroid } from 'react-native';
import { Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FilePickerProps } from '../Types';
import IconButton from './IconButton';
import GlobalStyles from '../assets/GlobalStyles';

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
        setSelectedFile(null);
        ToastAndroid.show("Vyberte prosím soubor s příponou .gpx",ToastAndroid.SHORT);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setSelectedFile(null);
        ToastAndroid.show("Nastala chyba během výběru souboru",ToastAndroid.SHORT);
      }
    }
  };

  return (
    <>
      <IconButton style={GlobalStyles.formField} icon="file-upload" text="Vybrat soubor s trasou" onPress={pickDocument}></IconButton>
      {selectedFile && (
        <>
          <Text style={[GlobalStyles.formField, {color: (colorScheme == "dark" ? "white" : "black")}]}>Vybraný soubor: {selectedFile.name}</Text>
          <IconButton icon="check" text="Importovat trasu" onPress={() => props.uploadDocument(selectedFile)}></IconButton>
        </>
      )}
    </>
  );
};

export default FilePicker;

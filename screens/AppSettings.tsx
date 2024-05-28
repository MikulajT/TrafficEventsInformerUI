import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

function AppSettings() {
  const [date, setDate] = useState(new Date(1598051730000));


  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "time",
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode();
  };

  return (
    // <SafeAreaView>
    //   <Button onPress={showTimepicker}>
    //     Show time picker
    //   </Button>
    // </SafeAreaView>
    <></>
  );
}

export default AppSettings;
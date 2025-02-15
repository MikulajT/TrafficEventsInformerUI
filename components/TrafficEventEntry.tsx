import React, { useState } from "react";
import { TrafficEventEntryProps } from "../Types";
import { Menu, Text } from "react-native-paper";
import { Appearance, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { darkTheme, lightTheme } from "../assets/Themes";
import { format, differenceInMilliseconds, differenceInDays } from "date-fns";

// TODO: Refactor styles
function TrafficEventEntry(props: TrafficEventEntryProps) {
  // Convert to date object
  const startDate = new Date(props.startDate);
  const endDate = new Date(props.endDate);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const colorScheme = Appearance.getColorScheme();
  const progressBarColor = (endDate.getTime() - new Date().getTime()) / 1000 < 0 ? "#00A36C" : "#A9A9A9"; // Jade - #00A36C, Dark Gray - #A9A9A9"

  function getRemainingTime(endTime: Date): string {
    const now = new Date();
    const differenceInMs = differenceInMilliseconds(endTime, now);
    const differenceInDaysValue = differenceInDays(endTime, now);
  
    if (differenceInDaysValue < 1) {
      if (differenceInMs < 0) {
        return '00:00:00';
      }
      const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
      const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
  
      return format(new Date(0, 0, 0, hours, minutes, seconds), 'HH:mm:ss');
    } else {
      return `${differenceInDaysValue} dnů`;
    }
  }

  function getProgressBarWidth(startDate: Date, endDate: Date/*totalDays: number, daysRemaining: number*/) {
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysRemaining = getRemainingDays(endDate);
    const progressBarWidth = Math.ceil((100 - (daysRemaining / totalDays) * 100));

    if (progressBarWidth < 0) {
      return 0; // Traffic event in future
    } else {
      return progressBarWidth;
    }
  }

  function getRemainingDays(endDate: Date) {
    const now = new Date();
    const daysRemaining = differenceInDays(endDate, now);
    return daysRemaining < 0 ? 0 : daysRemaining;
  }

  return (
    <View style={styles.menuButtonContainer}>
      <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={
            <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(
              colorScheme === "dark" ? darkTheme.colors.onPrimary : lightTheme.colors.onPrimary,
              false,
            )}
              onPress={props.onPress}
              onLongPress={() => setIsMenuVisible(true)}>
                <View style={[styles.button, {padding: 5, rowGap: 5, backgroundColor: colorScheme === "dark" ? darkTheme.colors.primary : lightTheme.colors.primary}]}>
                  <Text style={styles.buttonText}>{props.eventName}</Text>
                  <View style={{flexDirection: "row", justifyContent: "center" }}>
                    <Text style={[styles.buttonText, {fontSize: 12}]}>{format(startDate, "dd.MM.yyyy HH:mm:ss")}</Text>
                    <Text style={[styles.buttonText, {fontSize: 12}]}> – </Text>
                    <Text style={[styles.buttonText, {fontSize: 12}]}>{format(endDate, "dd.MM.yyyy HH:mm:ss")}</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, {backgroundColor: progressBarColor, width: `${getProgressBarWidth(startDate, endDate)}%` }]}>
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.progressText}>
                      {getRemainingTime(endDate)}
                      </Text>
                    </View>
                  </View>
                </View>
            </TouchableNativeFeedback>
          }>
          <Menu.Item
          key={props.eventId} 
          leadingIcon="pencil" 
          onPress={() => {
            setIsMenuVisible(false); 
            props.onRenamePress(props.eventId)}} 
          title="Změnit název události"/>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1, 
    marginBottom: 10
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  },
  menuButton: {
    marginLeft: 10,
    borderRadius: 15
  },

  progressBarContainer: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: "white",
    height: 15
  },
  progressBar: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: "black"
  }
});

export default TrafficEventEntry;
import React, { useState } from "react";
import { TrafficEventEntryProps } from "../Types";
import { Menu, Text } from "react-native-paper";
import { Appearance, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { darkTheme, lightTheme } from "../assets/Themes";
import { format } from "date-fns";

// TODO: Refactor styles
function TrafficEventEntry(props: TrafficEventEntryProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const colorScheme = Appearance.getColorScheme();
  const progressBarColor = props.daysRemaining > 0 ? "#228B22" : "#FF2400"; // green - #228B22, red - #FF2400

  function getProgressBarWidth(totalDays: number, daysRemaining: number) {
    const progressBarWidth = Math.ceil((100 - (daysRemaining / totalDays) * 100));

    if (progressBarWidth < 0) {
      return 0; // Traffic event in future
    } else {
      return progressBarWidth;
    }
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
                    <Text style={[styles.buttonText, {fontSize: 12}]}>{format(props.startDate, "dd.MM.yyyy HH:mm:ss")}</Text>
                    <Text style={[styles.buttonText, {fontSize: 12}]}> – </Text>
                    <Text style={[styles.buttonText, {fontSize: 12}]}>{format(props.endDate, "dd.MM.yyyy HH:mm:ss")}</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, {backgroundColor: progressBarColor, width: `${getProgressBarWidth(props.totalDays, props.daysRemaining)}%` }]}>
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.progressText}>
                      {props.daysRemaining} dnů
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
    backgroundColor: "grey",
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
    color: "white"
  }
});

export default TrafficEventEntry;
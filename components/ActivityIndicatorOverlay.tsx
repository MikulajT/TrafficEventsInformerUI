import { ActivityIndicator, StyleSheet, View } from "react-native";

function ActivityIndicatorOverlay() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  }
});

export default ActivityIndicatorOverlay;
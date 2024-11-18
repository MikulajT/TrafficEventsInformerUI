import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import BackgroundFetch from 'react-native-background-fetch';
import RouteEventsRequest from '../api/RouteEventsRequests';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../assets/Themes';
import { useNetInfo } from '@react-native-community/netinfo';
import NoNetworkConnection from '../screens/NoNetworkConnection';
import { persistor, store } from '../redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MasterNavigator from './MasterNavigator';

function App() {
  let colorScheme = useColorScheme();
  const { type, isConnected } = useNetInfo();

  BackgroundFetch.configure({
    minimumFetchInterval: 28800, // Minimum interval in seconds (8 hours)
    stopOnTerminate: false,
    startOnBoot: true,
  }, async (taskId) => {
    new RouteEventsRequest().syncAllUsersRouteEvents();
    console.log("Sync all route events.");
    BackgroundFetch.finish(taskId);
  }, async (taskId) => {  
    BackgroundFetch.finish(taskId);
  });

  function renderComponent() {
    if (isConnected) {
      // if (IsUserSignedIn()) {
        return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
                <MasterNavigator/>
              </PaperProvider>
            </PersistGate>
          </Provider>
        );
      //} else {
      //  return <SignIn/>;
      //}
    } else {
      return <NoNetworkConnection/>;
    }
  }

  return (
    renderComponent()
  );
}

export default App;
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../screens/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import TabNavigator from "./TabNavigator";

function MasterNavigator() {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  function renderComponent() {
    if (isSignedIn) {
      return (
        <TabNavigator/>
      );
    } else {
      return (
        <NavigationContainer>
          <SignIn/>
        </NavigationContainer>  
      );
    }
  }

  return renderComponent();
}

export default MasterNavigator;
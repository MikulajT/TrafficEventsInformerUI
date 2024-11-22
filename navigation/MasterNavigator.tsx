import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../screens/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import TabNavigator from "./TabNavigator";

function MasterNavigator() {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  return isSignedIn ? (
    <TabNavigator />
  ) : (
    <NavigationContainer>
      <SignIn />
    </NavigationContainer>
  );
}

export default MasterNavigator;
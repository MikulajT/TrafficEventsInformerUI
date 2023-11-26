import { StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
  HomeTab: undefined;
  SecondTab: { test: string };
  ThirdTab: undefined;
};

export type ScrollButtonProps = {
  id: number;
  text: string;
  onPress(): void;
};

export type IconButtonProps = {
  style?: StyleProp<ViewStyle>;
  icon: string;
  text: string;
  onPress(): void;
};

export type FilePickerProps = {
  uploadDocument(selectedFile: any): void;
}

export type TrafficRoute = {
  id: number;
  name: string;
};

export type RouteEvent = {
  id: number;
  name: string;
};
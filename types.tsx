import { StyleProp, ViewStyle } from "react-native";

export type RootStackParamList = {
  HomeTab: undefined;
  SecondTab: { test: string };
  ThirdTab: undefined;
};

export type ScrollButtonProps = {
  id: number | string;
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
  id: string;
  name: string;
};

export type RouteEventDetail = {
  id: string;
  type: string;
  description: string;
  startDate: Date;
  endDate: Date;
  daysRemaining: number;
  startPointX: number;
  startPointY: number;
  endPointX: number;
  endPointY: number;
};

export type MenuButtonProps = {
  id: number | string;
  text: string;
  onPress(): void;
};
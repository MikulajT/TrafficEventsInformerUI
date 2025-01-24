import { StyleProp, ViewStyle } from "react-native";
import { Timespan } from "react-native/Libraries/Utilities/IPerformanceLogger";

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
  startDate: Date;
  endDate: Date;
  totalDays: number;
  daysRemaining: number;
};

export type RouteEventDetail = {
  id: string;
  name: string;
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
  menuItems: MenuBottonItem[];
  disabled?: boolean;
  onPress(): void;
};

export type MenuBottonItem = {
  icon: string;
  text: string;
  onPress(entryId: number | string): void;
};

export type RouteNameProps = {
  routeName: string;
  showValidationMessage?: boolean;
  onNameChange(text: string): void;
}

export enum Operation {
  Update,
  Delete
}

export type ConfirmDialogProps = {
  isVisible: boolean;
  title: string;
  textContent: string;
  showCheckbox: boolean;
  onCancelPress(): void;
  onConfirmPress(checkboxChecked: boolean): void;
};

export type RenameDialogProps = {
  entryId: number | string;
  name: string;
  isVisible: boolean;
  onCancel(): void;
  onRename(entryId: number | string, name: string): void;
};

export type TrafficEventEntryProps = {
  eventId: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
  // totalDays: number;
  // remainingTime: Timespan;
  onPress(): void;
  onRenamePress(trafficEventId: string): void;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
};
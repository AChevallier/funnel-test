// Allow using the NativeWind-like `tw` prop in RN elements for this test scaffold
import "react-native";

declare module "react-native" {
  export interface ViewProps {
    tw?: string;
  }
  export interface TextProps {
    tw?: string;
  }
  export interface PressableProps {
    tw?: string;
  }
  export interface TextInputProps {
    tw?: string;
  }
}

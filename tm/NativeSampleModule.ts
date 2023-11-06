import { TurboModuleRegistry, TurboModule } from "react-native";

export type CustomType = {
  key: string;
  enabled: boolean;
  timestamp: number;
};

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly passCustomType: (input: CustomType) => CustomType;
  readonly getFrenchHello: () => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeSampleModule");

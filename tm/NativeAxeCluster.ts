import { TurboModuleRegistry, TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeAxeCluster');

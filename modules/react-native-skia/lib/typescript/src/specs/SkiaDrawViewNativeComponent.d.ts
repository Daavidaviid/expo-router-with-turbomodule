/// <reference types="react-native/types/modules/codegen" />
/// <reference types="react-native/codegen" />
import type { ViewProps } from 'react-native';
export interface NativeProps extends ViewProps {
    mode: string;
    debug?: boolean;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<NativeProps>;
export default _default;

import type { ExtrapolationType, SharedValue } from "react-native-reanimated";
import type { SkPath, SkPoint } from "../../skia/types";
export declare const notifyChange: (value: SharedValue<unknown>) => void;
export declare const useClock: () => SharedValue<number>;
export declare const usePathInterpolation: (value: SharedValue<number>, input: number[], outputRange: SkPath[], options?: ExtrapolationType) => SharedValue<SkPath>;
export declare const useVectorInterpolation: (value: SharedValue<number>, input: number[], outputRange: SkPoint[], options?: ExtrapolationType) => SharedValue<{
    x: number;
    y: number;
}>;

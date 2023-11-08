import type { DataSourceParam } from "../types";
/**
 * Returns a Skia Animated Image object
 * */
export declare const useAnimatedImage: (source: DataSourceParam, onError?: ((err: Error) => void) | undefined) => import("../types").SkAnimatedImage | null;

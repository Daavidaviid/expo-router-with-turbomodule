import type { DataSourceParam } from "../types";
/**
 * Returns a Skia Typeface object
 * */
export declare const useTypeface: (source: DataSourceParam, onError?: ((err: Error) => void) | undefined) => import("../types").SkTypeface | null;

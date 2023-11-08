import type { SkData, DataSourceParam, SkJSIInstance } from "../types";
export declare const loadData: <T>(source: DataSourceParam, factory: (data: SkData) => T | null, onError?: ((err: Error) => void) | undefined) => Promise<T | null>;
export declare const useCollectionLoading: <T extends SkJSIInstance<string>>(source: DataSourceParam[], loader: () => Promise<(T | null)[]>) => T[] | null;
export declare const useRawData: <T extends SkJSIInstance<string>>(source: DataSourceParam, factory: (data: SkData) => T | null, onError?: ((err: Error) => void) | undefined) => T | null;
export declare const useData: (source: DataSourceParam, onError?: ((err: Error) => void) | undefined) => SkData | null;

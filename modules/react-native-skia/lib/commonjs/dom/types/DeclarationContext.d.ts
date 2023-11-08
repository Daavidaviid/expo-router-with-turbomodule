import type { SkShader, SkPaint, SkImageFilter, SkMaskFilter, SkPathEffect, Skia, SkColorFilter } from "../../skia/types";
declare type Composer<T> = (outer: T, inner: T) => T;
export declare const composeDeclarations: <T>(filters: T[], composer: Composer<T>) => T;
declare class Declaration<T> {
    private composer?;
    private decls;
    private indexes;
    constructor(composer?: Composer<T> | undefined);
    private get index();
    save(): void;
    restore(): void;
    pop(): T | undefined;
    push(decl: T): void;
    popAll(): T[];
    popAllAsOne(): T;
}
export declare class DeclarationContext {
    private Skia;
    readonly paints: Declaration<SkPaint>;
    readonly maskFilters: Declaration<SkMaskFilter>;
    readonly shaders: Declaration<SkShader>;
    readonly pathEffects: Declaration<SkPathEffect>;
    readonly imageFilters: Declaration<SkImageFilter>;
    readonly colorFilters: Declaration<SkColorFilter>;
    constructor(Skia: Skia);
    save(): void;
    restore(): void;
}
export {};

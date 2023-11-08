import type { SkColorFilter } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { BlendColorFilterProps, MatrixColorFilterProps } from "../../types";
import { NodeType } from "../../types";
import type { LerpColorFilterProps } from "../../types/ColorFilters";
import type { DeclarationContext } from "../../types/DeclarationContext";
export declare abstract class ColorFilterDeclaration<P> extends JsiDeclarationNode<P> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    protected composeAndPush(ctx: DeclarationContext, cf1: SkColorFilter): void;
}
export declare class MatrixColorFilterNode extends ColorFilterDeclaration<MatrixColorFilterProps> {
    constructor(ctx: NodeContext, props: MatrixColorFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class BlendColorFilterNode extends ColorFilterDeclaration<BlendColorFilterProps> {
    constructor(ctx: NodeContext, props: BlendColorFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class LinearToSRGBGammaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    decorate(ctx: DeclarationContext): void;
}
export declare class SRGBToLinearGammaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    decorate(ctx: DeclarationContext): void;
}
export declare class LumaColorFilterNode extends ColorFilterDeclaration<null> {
    constructor(ctx: NodeContext);
    decorate(ctx: DeclarationContext): void;
}
export declare class LerpColorFilterNode extends ColorFilterDeclaration<LerpColorFilterProps> {
    constructor(ctx: NodeContext, props: LerpColorFilterProps);
    decorate(ctx: DeclarationContext): void;
}

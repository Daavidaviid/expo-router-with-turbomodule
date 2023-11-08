import type { SkImageFilter } from "../../../skia/types";
import type { BlendImageFilterProps, BlurImageFilterProps, DeclarationContext, DisplacementMapImageFilterProps, DropShadowImageFilterProps, MorphologyImageFilterProps, OffsetImageFilterProps, RuntimeShaderImageFilterProps } from "../../types";
import { NodeType } from "../../types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
export declare abstract class ImageFilterDeclaration<P> extends JsiDeclarationNode<P> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    protected input(ctx: DeclarationContext): SkImageFilter | null;
    protected composeAndPush(ctx: DeclarationContext, imgf1: SkImageFilter): void;
}
export declare class OffsetImageFilterNode extends ImageFilterDeclaration<OffsetImageFilterProps> {
    constructor(ctx: NodeContext, props: OffsetImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class DisplacementMapImageFilterNode extends ImageFilterDeclaration<DisplacementMapImageFilterProps> {
    constructor(ctx: NodeContext, props: DisplacementMapImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class BlurImageFilterNode extends ImageFilterDeclaration<BlurImageFilterProps> {
    constructor(ctx: NodeContext, props: BlurImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class DropShadowImageFilterNode extends ImageFilterDeclaration<DropShadowImageFilterProps> {
    constructor(ctx: NodeContext, props: DropShadowImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare enum MorphologyOperator {
    Erode = 0,
    Dilate = 1
}
export declare class MorphologyImageFilterNode extends ImageFilterDeclaration<MorphologyImageFilterProps> {
    constructor(ctx: NodeContext, props: MorphologyImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class BlendImageFilterNode extends ImageFilterDeclaration<BlendImageFilterProps> {
    constructor(ctx: NodeContext, props: BlendImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class RuntimeShaderImageFilterNode extends ImageFilterDeclaration<RuntimeShaderImageFilterProps> {
    constructor(ctx: NodeContext, props: RuntimeShaderImageFilterProps);
    decorate(ctx: DeclarationContext): void;
}

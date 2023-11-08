import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { ColorProps, DeclarationContext, FractalNoiseProps, ImageShaderProps, LinearGradientProps, RadialGradientProps, ShaderProps, SweepGradientProps, TurbulenceProps, TwoPointConicalGradientProps } from "../../types";
import { NodeType } from "../../types";
export declare abstract class ShaderDeclaration<P> extends JsiDeclarationNode<P> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
}
export declare class ShaderNode extends ShaderDeclaration<ShaderProps> {
    constructor(ctx: NodeContext, props: ShaderProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class ImageShaderNode extends ShaderDeclaration<ImageShaderProps> {
    constructor(ctx: NodeContext, props: ImageShaderProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class ColorNode extends ShaderDeclaration<ColorProps> {
    constructor(ctx: NodeContext, props: ColorProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class TurbulenceNode extends ShaderDeclaration<TurbulenceProps> {
    constructor(ctx: NodeContext, props: TurbulenceProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class FractalNoiseNode extends ShaderDeclaration<FractalNoiseProps> {
    constructor(ctx: NodeContext, props: FractalNoiseProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class LinearGradientNode extends ShaderDeclaration<LinearGradientProps> {
    constructor(ctx: NodeContext, props: LinearGradientProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class RadialGradientNode extends ShaderDeclaration<RadialGradientProps> {
    constructor(ctx: NodeContext, props: RadialGradientProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class SweepGradientNode extends ShaderDeclaration<SweepGradientProps> {
    constructor(ctx: NodeContext, props: SweepGradientProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class TwoPointConicalGradientNode extends ShaderDeclaration<TwoPointConicalGradientProps> {
    constructor(ctx: NodeContext, props: TwoPointConicalGradientProps);
    decorate(ctx: DeclarationContext): void;
}

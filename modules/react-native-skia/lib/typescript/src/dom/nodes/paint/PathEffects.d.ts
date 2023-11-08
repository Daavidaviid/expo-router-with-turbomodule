import type { SkPathEffect } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { CornerPathEffectProps, DashPathEffectProps, DiscretePathEffectProps, Line2DPathEffectProps, Path1DPathEffectProps, Path2DPathEffectProps } from "../../types";
import { NodeType } from "../../types";
import type { DeclarationContext } from "../../types/DeclarationContext";
declare abstract class PathEffectDeclaration<P> extends JsiDeclarationNode<P> {
    constructor(ctx: NodeContext, type: NodeType, props: P);
    protected composeAndPush(ctx: DeclarationContext, pe1: SkPathEffect): void;
}
export declare class DiscretePathEffectNode extends PathEffectDeclaration<DiscretePathEffectProps> {
    constructor(ctx: NodeContext, props: DiscretePathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class Path2DPathEffectNode extends PathEffectDeclaration<Path2DPathEffectProps> {
    constructor(ctx: NodeContext, props: Path2DPathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class DashPathEffectNode extends PathEffectDeclaration<DashPathEffectProps> {
    constructor(ctx: NodeContext, props: DashPathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class CornerPathEffectNode extends PathEffectDeclaration<CornerPathEffectProps> {
    constructor(ctx: NodeContext, props: CornerPathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class SumPathEffectNode extends PathEffectDeclaration<null> {
    constructor(ctx: NodeContext);
    decorate(ctx: DeclarationContext): void;
}
export declare class Line2DPathEffectNode extends PathEffectDeclaration<Line2DPathEffectProps> {
    constructor(ctx: NodeContext, props: Line2DPathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export declare class Path1DPathEffectNode extends PathEffectDeclaration<Path1DPathEffectProps> {
    constructor(ctx: NodeContext, props: Path1DPathEffectProps);
    decorate(ctx: DeclarationContext): void;
}
export {};

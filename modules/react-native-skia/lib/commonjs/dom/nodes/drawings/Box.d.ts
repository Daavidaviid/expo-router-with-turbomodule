import type { DrawingContext } from "../../types";
import type { BoxShadowProps, BoxProps } from "../../types/Drawings";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import { JsiRenderNode } from "../RenderNode";
import type { DeclarationContext } from "../../types/DeclarationContext";
export declare class BoxShadowNode extends JsiDeclarationNode<BoxShadowProps> {
    constructor(ctx: NodeContext, props: BoxShadowProps);
    decorate(_ctx: DeclarationContext): void;
    materialize(): BoxShadowProps;
}
export declare class BoxNode extends JsiRenderNode<BoxProps> {
    constructor(ctx: NodeContext, props: BoxProps);
    renderNode({ canvas, paint }: DrawingContext): void;
}

import type { DeclarationNode, PaintProps } from "../types";
import type { DeclarationContext } from "../types/DeclarationContext";
import type { NodeContext } from "./Node";
import { JsiDeclarationNode } from "./Node";
export declare class PaintNode extends JsiDeclarationNode<PaintProps> implements DeclarationNode<PaintProps> {
    constructor(ctx: NodeContext, props?: PaintProps);
    decorate(ctx: DeclarationContext): void;
}

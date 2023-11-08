import type { BlendProps } from "../../types/ImageFilters";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { DeclarationContext } from "../../types/DeclarationContext";
export declare class BlendNode extends JsiDeclarationNode<BlendProps> {
    constructor(ctx: NodeContext, props: BlendProps);
    decorate(ctx: DeclarationContext): void;
}

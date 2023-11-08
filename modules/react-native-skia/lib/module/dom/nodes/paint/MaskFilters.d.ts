import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { BlurMaskFilterProps } from "../../types";
import type { DeclarationContext } from "../../types/DeclarationContext";
export declare class BlurMaskFilterNode extends JsiDeclarationNode<BlurMaskFilterProps> {
    constructor(ctx: NodeContext, props: BlurMaskFilterProps);
    decorate(ctx: DeclarationContext): void;
}

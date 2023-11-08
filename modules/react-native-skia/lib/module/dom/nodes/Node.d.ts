import type { Skia } from "../../skia/types";
import type { Node, DeclarationNode, NodeType, DeclarationType } from "../types";
import type { DependencyManager } from "../../renderer/DependencyManager";
import type { DeclarationContext } from "../types/DeclarationContext";
export interface NodeContext {
    Skia: Skia;
    depMgr: DependencyManager;
}
export declare abstract class JsiNode<P> implements Node<P> {
    type: NodeType;
    protected props: P;
    protected _children: JsiNode<unknown>[];
    protected Skia: Skia;
    protected depMgr: DependencyManager;
    constructor(ctx: NodeContext, type: NodeType, props: P);
    setProps(props: P): void;
    setProp<K extends keyof P>(name: K, v: P[K]): boolean;
    getProps(): P;
    children(): JsiNode<unknown>[];
    addChild(child: Node<unknown>): void;
    dispose(): void;
    removeChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
}
export declare type Invalidate = () => void;
export declare abstract class JsiDeclarationNode<P> extends JsiNode<P> implements DeclarationNode<P> {
    declarationType: DeclarationType;
    private invalidate;
    constructor(ctx: NodeContext, declarationType: DeclarationType, type: NodeType, props: P);
    abstract decorate(ctx: DeclarationContext): void;
    protected decorateChildren(ctx: DeclarationContext): void;
    addChild(child: Node<unknown>): void;
    insertChildBefore(child: Node<unknown>, before: Node<unknown>): void;
    dispose(): void;
    setInvalidate(invalidate: Invalidate): void;
    setProps(props: P): void;
    setProp<K extends keyof P>(name: K, v: P[K]): boolean;
}

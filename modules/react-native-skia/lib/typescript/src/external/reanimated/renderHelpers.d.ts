import type { Container } from "../../renderer/Container";
import type { AnimatedProps } from "../../renderer/processors";
import type { Node } from "../../dom/types";
export declare const unbindReanimatedNode: (node: Node<unknown>) => void;
export declare function extractReanimatedProps(props: AnimatedProps<any>): AnimatedProps<any, never>[];
export declare function bindReanimatedProps(container: Container, node: Node<any>, reanimatedProps: AnimatedProps<any>): void;

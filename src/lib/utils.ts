export function genUid() {
  return Math.random().toString(16).slice(2);
}

export function runNode(node: Node, f: (node: Node) => unknown): SvelteActionReturnType {
  f(node);
}

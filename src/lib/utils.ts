export function genUid() {
  return Math.random().toString(16).slice(2);
}

export function runNode(node: Node, f: (node: Node) => unknown): SvelteActionReturnType {
  f(node);
}

export function factorial(n: number) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

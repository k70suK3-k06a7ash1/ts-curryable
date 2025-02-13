export type Curry<F> = F extends (...args: infer A) => infer R ? A extends [infer First, ...infer Rest] ? (arg: First) => Curry<(...args: Rest) => R> : R : never;
export declare function curryable<F extends (...args: any[]) => any>(fn: F): Curry<F>;

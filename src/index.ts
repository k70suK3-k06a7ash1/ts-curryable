export type Curry<F> = F extends (...args: infer A) => infer R
	? A extends [infer First, ...infer Rest]
		? (arg: First) => Curry<(...args: Rest) => R>
		: R
	: never;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function curryable<F extends (...args: any[]) => any>(fn: F): Curry<F> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return function curried(...args: any[]): any {
		if (args.length >= fn.length) {
			return fn(...args);
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (...nextArgs: any[]) => curried(...args, ...nextArgs);
	} as Curry<F>;
}

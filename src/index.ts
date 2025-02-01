type Curry<F> = F extends (...args: infer A) => infer R
	? A extends [infer First, ...infer Rest]
		? (arg: First) => Curry<(...args: Rest) => R>
		: R
	: never;

function curryable<F extends (...args: any[]) => any>(fn: F): Curry<F> {
	return function curried(...args: any[]): any {
		if (args.length >= fn.length) {
			return fn(...args);
		}
		return (...nextArgs: any[]) => curried(...args, ...nextArgs);
	} as Curry<F>;
}

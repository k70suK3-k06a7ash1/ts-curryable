import { expect, it } from "vitest";
import { type Curry, curryable } from ".";

it("curries a simple function", () => {
	const add = (a: number, b: number) => a + b;
	const curriedAdd = curryable(add);

	expect(curriedAdd(1)(2)).toBe(3);
});

it("curries a function with three arguments", () => {
	const add3 = (a: number, b: number, c: number) => a + b + c;
	const curriedAdd3 = curryable(add3);

	expect(curriedAdd3(1)(2)(3)).toBe(6);
});

it("curries a function with different types", () => {
	const greet = (greeting: string, name: string, age: number) =>
		`${greeting}, ${name}! You are ${age} years old.`;
	const curriedGreet = curryable(greet);

	expect(curriedGreet("Hello")("World")(30)).toBe(
		"Hello, World! You are 30 years old.",
	);
});

// it("handles functions with no arguments", () => {
// 	const sayHello = () => "Hello!";
// 	const curriedSayHello = curryable(sayHello);

// 	expect(curriedSayHello).toBe("Hello!");
// });

it("handles functions that return void", () => {
	let sideEffect = 0;
	const increment = (a: number) => {
		sideEffect += a;
	};
	const curriedIncrement = curryable(increment);

	curriedIncrement(5);
	expect(sideEffect).toBe(5);
});

it("correctly infers the type of the curried function", () => {
	const divide = (a: number, b: number): number => a / b;
	const curriedDivide: Curry<typeof divide> = curryable(divide);

	const result = curriedDivide(10)(2);
	expect(result).toBe(5);
});

it("supports generics", () => {
	const identity = <T>(x: T): T => x;
	const curriedIdentity = curryable(identity);

	expect(curriedIdentity(5)).toBe(5);
	expect(curriedIdentity("hello")).toBe("hello");
	const obj = { a: 1 };
	expect(curriedIdentity(obj)).toBe(obj);
});

// it("supports optional parameters", () => {
// 	const greetOptional = (greeting: string, name?: string) =>
// 		`${greeting}, ${name || "World"}!`;
// 	const curriedGreetOptional = curryable(greetOptional);

// 	expect(curriedGreetOptional("Hello")).toBe("Hello");
// 	expect(curriedGreetOptional("Hi")).toBe("Hi");
// 	expect(curriedGreetOptional("Hey")).toBe("Hey");
// });

it("works with different return types", () => {
	const createPerson = (name: string, age: number, city: string) => ({
		name,
		age,
		city,
	});
	const curriedCreatePerson = curryable(createPerson);

	const person = curriedCreatePerson("Alice")(30)("Wonderland");
	expect(person).toEqual({ name: "Alice", age: 30, city: "Wonderland" });
});

import { expect, it } from "vitest";
import { curryable } from ".";
it("curries a simple function", function () {
    var add = function (a, b) { return a + b; };
    var curriedAdd = curryable(add);
    expect(curriedAdd(1)(2)).toBe(3);
});
it("curries a function with three arguments", function () {
    var add3 = function (a, b, c) { return a + b + c; };
    var curriedAdd3 = curryable(add3);
    expect(curriedAdd3(1)(2)(3)).toBe(6);
});
it("curries a function with different types", function () {
    var greet = function (greeting, name, age) {
        return "".concat(greeting, ", ").concat(name, "! You are ").concat(age, " years old.");
    };
    var curriedGreet = curryable(greet);
    expect(curriedGreet("Hello")("World")(30)).toBe("Hello, World! You are 30 years old.");
});
// it("handles functions with no arguments", () => {
// 	const sayHello = () => "Hello!";
// 	const curriedSayHello = curryable(sayHello);
// 	expect(curriedSayHello).toBe("Hello!");
// });
it("handles functions that return void", function () {
    var sideEffect = 0;
    var increment = function (a) {
        sideEffect += a;
    };
    var curriedIncrement = curryable(increment);
    curriedIncrement(5);
    expect(sideEffect).toBe(5);
});
it("correctly infers the type of the curried function", function () {
    var divide = function (a, b) { return a / b; };
    var curriedDivide = curryable(divide);
    var result = curriedDivide(10)(2);
    expect(result).toBe(5);
});
it("supports generics", function () {
    var identity = function (x) { return x; };
    var curriedIdentity = curryable(identity);
    expect(curriedIdentity(5)).toBe(5);
    expect(curriedIdentity("hello")).toBe("hello");
    var obj = { a: 1 };
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
it("works with different return types", function () {
    var createPerson = function (name, age, city) { return ({
        name: name,
        age: age,
        city: city,
    }); };
    var curriedCreatePerson = curryable(createPerson);
    var person = curriedCreatePerson("Alice")(30)("Wonderland");
    expect(person).toEqual({ name: "Alice", age: 30, city: "Wonderland" });
});

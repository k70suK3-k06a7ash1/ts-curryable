import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts?(x)"],
		poolMatchGlobs: [
			["src/**/*.test.ts?(x)", "threads"],
			["src/**/*.ts?(x)", "typescript"],
		],
		typecheck: {
			enabled: true,
			ignoreSourceErrors: true,
			include: ["**/*.test.ts"],
		},

		exclude: ["node_modules"],
		maxConcurrency: 5,
	},
});

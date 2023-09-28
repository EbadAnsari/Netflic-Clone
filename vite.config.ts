import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": resolve(__dirname, "./src/components"),
			"@interfaces": resolve(__dirname, "./src/interfaces"),
			"@store": resolve(__dirname, "./src/store"),
			"@layout": resolve(__dirname, "./src/layout"),
			"@utils": resolve(__dirname, "./src/utils"),
			"@hooks": resolve(__dirname, "./src/hooks"),
			"@animation": resolve(__dirname, "./src/animation"),
			"@routes": resolve(__dirname, "./src/components/routes"),
			"@context": resolve(__dirname, "./src/context"),
			"@firebase-config": resolve(
				__dirname,
				"./src/config/firebase-config.ts",
			),
		},
	},
	server: {
		open: "/in",
	},
});

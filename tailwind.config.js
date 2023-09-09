/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,html,css}"],
	theme: {
		extend: {
			colors: {
				gray: "#f2f2f2",
			},
			animation: {
				spinner: "spin 1.5s ease infinite",
			},
		},
	},
	plugins: [],
};

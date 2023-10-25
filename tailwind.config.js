/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,html,css}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				gray: "#f2f2f2",
				"netflix-red": "#e50914",
				"netflix-red-hover": "#f6121d",
			},
			animation: {
				spinner: "spin 1.5s ease infinite",
			},
			zIndex: {
				modal: "60",
				"video-watch": "70",
			},
			backgroundImage: {
				sun: "url('public/icons/sun.svg')",
				moon: "url('public/icons/moon.svg')",
			},
			screens: {
				xs: "520px",
			},
		},
	},
	plugins: [],
};

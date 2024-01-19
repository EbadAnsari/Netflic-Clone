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
				"arsenic-100": "#AFC5D2",
				"arsenic-200": "#80A6AF",
				"arsenic-400": "#3B556E",
				"arsenic-800": "#33444E",
				"arsenic-950": "#1F363E",
				o: "#F1A513",
				x: "#1FC9EA",
				"o-shadow": "#D9720E",
				"x-shadow": "#20A8BB",
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
			height: {
				"d-screen": "100dvh",
			},
			width: {
				"d-screen": "100dvw",
			},
		},
	},
	plugins: [],
};

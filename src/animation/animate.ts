export const slideInOut = {
	initial: {
		translateX: 20,
		opacity: 0,
	},
	animate: {
		translateX: 0,
		opacity: 1,
	},
	exit: {
		translateX: -20,
		opacity: 0,
	},
	transition: {
		duration: 0.4,
	},
};

export const popUp = {
	initial: {
		scale: 0.95,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
	},
	transition: {
		duration: 0.4,
	},
};

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

document.body.onload = function () {
	Array.from(
		document.getElementsByClassName("input-box-container"),
		(element) => {
			element.addEventListener("click", function (event) {
				try {
					(
						(event.target as HTMLDivElement)
							.previousSibling as HTMLInputElement
					).focus();
				} catch (error) {
					(
						(event.target as HTMLDivElement)
							.nextSibling as HTMLInputElement
					).focus();
				}
			});
		},
	);

	// Array.from(document.getElementsByClassName("checkbox")).forEach(
	// 	(element) => {
	// 		element.addEventListener("click", (event) => {
	// 			const element = event.target as HTMLLabelElement;

	// 			element.dataset["value"] = element.classList.toggle(
	// 				"checkbox-on",
	// 			)
	// 				? "1"
	// 				: "0";
	// 		});

	// 		element.addEventListener("touchstart", (event) => {
	// 			const element = event.target as HTMLLabelElement;

	// 			element.dataset["value"] = element.classList.toggle(
	// 				"checkbox-on",
	// 			)
	// 				? "1"
	// 				: "0";
	// 		});
	// 	},
	// );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);

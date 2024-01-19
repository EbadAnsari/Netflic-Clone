import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Authentication from "./context/AuthContext";
import MediaQuery from "./MediaQuery";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Authentication>
				<MediaQuery />
				<App />
			</Authentication>
		</Provider>
	</React.StrictMode>,
);

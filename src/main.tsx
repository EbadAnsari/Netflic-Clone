import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import Authentication from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Authentication>
				<App />
			</Authentication>
		</Provider>
	</React.StrictMode>,
);

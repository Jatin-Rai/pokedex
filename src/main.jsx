import React from "react";

// ReactDOM client import
import ReactDOM from "react-dom/client";

// ** Components imports
import App from "./App.jsx";

// ** Styles imports
import "./styles/index.css";

// ** Store imports
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

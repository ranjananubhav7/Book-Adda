import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Header from "./components/Header.jsx";
import Book from "./components/Book.jsx";

ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(<Book />, document.getElementById("book"))

ReactDOM.render(<Header />, document.getElementById("header"));
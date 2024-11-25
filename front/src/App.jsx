import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./appRouter.jsx";
import "./Styles/main.scss";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;

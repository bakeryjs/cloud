import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <div>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

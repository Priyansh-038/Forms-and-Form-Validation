import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SuccessPage from "./SuccessPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpForm />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import {Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Messages from "./components/Messages";
import CheckEmail from "./pages/CheckEmail";
import CheckPassword from "./pages/CheckPassword";
import AuthLayouts from "./layout/index";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/register"  element={ <AuthLayouts><Register /></AuthLayouts> } />
          <Route path="/email" element={ <AuthLayouts><CheckEmail /></AuthLayouts> } />
          <Route path="/password" element={<AuthLayouts><CheckPassword /></AuthLayouts>} />
          <Route path="/:userId" element={<Messages />} />
        </Routes>
        <Toaster />
    </>
  );
}

export default App;

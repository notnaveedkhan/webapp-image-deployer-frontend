import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Auth/Navbar";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export default function Index() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

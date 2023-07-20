import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Auth/Navbar";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";
import Register from "../../pages/Register";
import VerifyEmail from "../../pages/VerifyEmail";
import { RootState } from "../../store";

export default function Index() {
  const { isRegistered } = useSelector((state: RootState) => state.verifyEmail);

  if (isRegistered) {
    return (
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

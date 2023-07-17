import { useSelector } from "react-redux";
import User from "./User";
import { RootState } from "../../store";
import isAdmin from "../../Helper/Admin";
import Admin from "./Admin";

export default function Protected() {
  const user = useSelector((state: RootState) => state.user);
  const admin = isAdmin(user.roles);

  if (admin) {
    return <Admin />;
  }

  return <User />;
}

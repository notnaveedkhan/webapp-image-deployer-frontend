import Auth from "./Auth";
import Protected from "./protected";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { load } from "react-cookies";
import { addLoginInfo } from "../states/loginInfo";
import { setUser } from "../states/userState";

export default function RootRoute() {
  const dispatch = useDispatch();
  const { login } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    const token = load("token");
    if (token) {
      dispatch(
        addLoginInfo({
          login: true,
          token: token,
          expireAt: "",
        })
      );
      const user = load("user");
      if (user) {
        dispatch(setUser(user));
      }
    }
    // eslint-disable-next-line
  }, [login]);
  return <>{login ? <Protected /> : <Auth />}</>;
}

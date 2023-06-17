import RootRoute from "./routes/RootRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  useEffect(() => {
    const matchResult = document.cookie.match(/token=([^;]+)/);
    const tokenExpirationDate = matchResult?.[1]
      ? new Date(JSON.parse(atob(matchResult[1].split(".")[1])).exp * 1000)
      : null;
    if (tokenExpirationDate) {
      const timeUntilExpiration = tokenExpirationDate.getTime() - Date.now();
      const timeoutId = setTimeout(() => {
        console.log("token expired");
        window.location.href = "/";
      }, timeUntilExpiration);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <RootRoute />
    </>
  );
}

export default App;


import RootRoute from './routes/RootRoute';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate=useNavigate()
    useEffect(() => {
        const matchResult = document.cookie.match(/token=([^;]+)/);
        const tokenExpirationDate = matchResult?.[1] ? new Date(JSON.parse(atob(matchResult[1].split('.')[1])).exp * 1000) : null;

        console.log(tokenExpirationDate);
        if (tokenExpirationDate) {
            const timeUntilExpiration = tokenExpirationDate.getTime() - Date.now();
            const timeoutId = setTimeout(() => {
                navigate("/")
                window.location.reload();
            }, timeUntilExpiration);

            // Clear the timeout when the component unmounts or when the token cookie changes
            return () => clearTimeout(timeoutId);
        } else {
            console.log('Token expiration date not found.');
        }
        // eslint-disable-next-line
    }, []);
    return (
    <>
      <RootRoute/>
    </>
  );
}

export default App;

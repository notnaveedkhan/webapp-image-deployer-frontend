import RootRoute from './routes/RootRoute';
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
    const {expireAt}=useSelector((state:RootState)=>state.login)
    const navigate=useNavigate()
    useEffect(() => {
        const matchResult = document.cookie.match(/token=([^;]+)/);
        const tokenExpirationDate =matchResult?.[1] ? new Date(JSON.parse(atob(matchResult[1].split('.')[1])).exp * 1000) :null;
        console.log(tokenExpirationDate);
        if (tokenExpirationDate) {
            const timeUntilExpiration = tokenExpirationDate.getTime() - Date.now();
            const timeoutId = setTimeout(() => {
                navigate("/")
                window.location.reload();
            }, timeUntilExpiration);
            return () => clearTimeout(timeoutId);
        } else {
            const tokenExpirationDate = expireAt ? new Date(expireAt) : null;
            console.log(tokenExpirationDate);
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

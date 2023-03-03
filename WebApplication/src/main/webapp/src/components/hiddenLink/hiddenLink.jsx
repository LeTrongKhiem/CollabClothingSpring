import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn) {
        return children;
    }
    return null;
};
const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (!isLoggedIn) {
        return children;
    }
    return null;
};
export { ShowOnLogin, ShowOnLogout };

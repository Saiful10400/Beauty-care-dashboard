import type { ReactNode } from "react";
import LoginPage from "../components/Login";



interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {

    const localStorageToken = localStorage.getItem("token")

    if (localStorageToken === import.meta.env.VITE_Token) {
        return children
    } else {
        return <LoginPage />
    }



};

export default Auth;

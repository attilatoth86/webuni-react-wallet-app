import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({children}) {

    const [authToken, setAuthToken] = useState(false);
    const [sessionUser, setSessionUser] = useState({});

    const handleLoginResult = useCallback(
        loginResponseData => {
            setAuthToken(loginResponseData.token);
            setSessionUser(loginResponseData.user);
        }, [setAuthToken, setSessionUser]
    );

    const handleLogout = useCallback(
        ()=>{
            handleLoginResult({token: false, user: {}});
        }, [handleLoginResult]
    );

    return (
        <AuthContext.Provider 
         value={{authToken, sessionUser, handleLoginResult, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
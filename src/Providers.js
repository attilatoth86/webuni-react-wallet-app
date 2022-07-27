import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";

export default function Providers({children}) {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </AuthContextProvider>
    );
}
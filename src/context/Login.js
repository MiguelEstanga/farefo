import { createContext, useState } from "react";

export const LoginContext = createContext()
function LoginProvier({children}) {
    const [Login , setLogin] = useState(false)
    const [credenciales , setCredenciales] = useState({})
    return (  
        <LoginContext.Provider
            value={{
                Login,
                setLogin,
                credenciales,
                setCredenciales
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvier;
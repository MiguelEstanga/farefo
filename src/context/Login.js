import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext()
function LoginProvier({children}) {
    const [Login , setLogin] = useState(false)
    const [credenciales , setCredenciales] = useState({})
    const [timeStart  , setTimeStart  ] = useState(false)
    const [timeEnd    , setTimeEnd    ] = useState(false)
     const navigation = useNavigation()
    useEffect(() => {
        console.log('tiempo de inicio', timeStart)
        console.log('tiempo de fin', timeEnd)
        /** 
        if( Login === true ){
            setTimeout(() => {
                console.log('se termino el tiempo ' )
                console.log('2 + 2 = ', 2+2)
                setLogin(false)
                //setCredenciales({})
                navigation.navigate('Login')
                return 
            } , 50000) 
        }else {
            setCredenciales({})
            console.log('no a iniciado el contador')
        }*/
      

    }  , [Login])

   
    return (  
        <LoginContext.Provider
            value={{
                Login,
                setLogin,
                credenciales,
                setCredenciales,
                setTimeEnd,
                setTimeStart,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvier;
import { createContext, useState,useEffect } from "react";

export const TarjetaContext =  createContext()
function TarjetaProvider({children}) {
    const [tarjeta , setTarjeta] = useState({})
    useEffect(()=>{
        console.log(tarjeta)
    },[tarjeta])
    return ( 
    <TarjetaContext.Provider
        value={{
            tarjeta,
            setTarjeta
        }}
    >
        {children}
    </TarjetaContext.Provider> );
}

export default TarjetaProvider;
import { createContext, useState } from "react";

export const TarjetaContext =  createContext()
function TarjetaProvider({children}) {
    const [tarjeta , setTarjeta] = useState({})

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
import { Children, createContext, useState } from "react";



export const TranferenciaContext = createContext({});
export default function TranferenciaProvider({children})
{
    const [tranferencia, setTranferencia] = useState({});
    const [ tranfereciaDatosExitoso , setTranferenciaDatosExitoso ] = useState({});
    return (
        <TranferenciaContext.Provider value={{
            tranferencia,
            setTranferencia,
            tranfereciaDatosExitoso,
            setTranferenciaDatosExitoso
        }} >
            {children}
        </TranferenciaContext.Provider>
    )
}
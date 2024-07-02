import { Children, createContext, useState } from "react";



export const TranferenciaContext = createContext({});
export default function TranferenciaProvider({children})
{
    const [avanzar , setAvanzar] = useState(false)
    const [tranferencia, setTranferencia] = useState({
        monto:''
    });
    const [ tranfereciaDatosExitoso , setTranferenciaDatosExitoso ] = useState({});
    return (
        <TranferenciaContext.Provider value={{
            tranferencia,
            setTranferencia,
            tranfereciaDatosExitoso,
            setTranferenciaDatosExitoso,
            avanzar,
            setAvanzar
        }} >
            {children}
        </TranferenciaContext.Provider>
    )
}
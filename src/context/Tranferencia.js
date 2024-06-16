import { Children, createContext, useState } from "react";



export const TranferenciaContext = createContext({});
export default function TranferenciaProvider({children})
{
    const [tranferencia, setTranferencia] = useState({});
    
    return (
        <TranferenciaContext.Provider value={{
            tranferencia,
            setTranferencia
        }} >
            {children}
        </TranferenciaContext.Provider>
    )
}
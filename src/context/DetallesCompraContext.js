import { createContext, useState } from "react";

export const DetalleComprasContext = createContext()

export default function DetalleComprasProvider({children})
{
    const [detallesCompras , setDetallesCompra]= useState({})
    const [show , setShow] = useState(false)

    return( 
    <DetalleComprasContext.Provider
        value={{
            detallesCompras,
            setDetallesCompra,
            show,
            setShow
        }}
    >
            {children}
    </DetalleComprasContext.Provider>)
}
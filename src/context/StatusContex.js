import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { LoginContext } from "./Login";
import { TarjetaContext } from "./Tarjeta";
import axios from "axios";
 
export const StatusContext =  createContext()


function StatusProvider({children}) {
    const [state , setState] = useState(false)
    const [status , setStatus] = useState(true)
    const {credenciales} = useContext(LoginContext)
    const {tarjeta} = useContext(TarjetaContext)

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credenciales.Token}`,
    };
    const handleStatus = ()=>{
      axios
      .post(
        "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ValidarTarjeta/",
        {
          "IDSolicitud": "",
          "Tarjeta": tarjeta.Tarjeta
        },
        {
          headers
        }
      )
      .then((res) => {
        console.log("aqui esta");
        console.log(res.data)
        if(res.status == 200){
            res.data.DescripcionStatus === "INACTIVA" ? setStatus(false) : setStatus(true);
            res.data.DescripcionStatus == "ACTIVA" ? setState(true) : setState(false) 
        }
    
      })
      .catch(error => console.log(error))
    }
    useEffect(()=> {
      handleStatus()
      
    } , [state ])
    return ( 

        <StatusContext.Provider
            value={{
                state,
                setState,
                status,
                setStatus,
                handleStatus
            }}
        >
            {children}
        </StatusContext.Provider>
     );
}

export default StatusProvider;
import axios from "axios";
import { URL, endpoint } from "./Api";
import { useState, useEffect } from "react";
import { HelperHeader } from "./HelperHeader";

export default function HelperTarjeta(usuario) {
  const [tarjeta, setResponse] = useState();
  const [error_bool, setError] = useState(false);
  const [estado , setEstado] = useState(false)
  const headers =  {
    "Content-Type": "application/json",
    "Credenciales": "R2VuZXJpY1VzZXI6RG51LjEyMw==",
    };

  useEffect(() => {
    axios
      .post(`${URL.UrlBase}${endpoint.OBTENER_DATOS_DE_LA_TAJETA}`, 
      {
        IDSolicitud: "",
        telefono: usuario,
      },
      {
        headers
      })
      .then((res) => {
        setEstado(true)
      
        if(res.data.CodRespuesta === "1054")
        {
          setResponse([])
        }else{
          setResponse(res.data);
        }
       
      })
      .catch((error) => {
        setError(true);
      })
      .finally(res => {
        setEstado(false)
      })
  }, [usuario]); // Dependencia del efecto

  return [tarjeta, error_bool , estado];
}

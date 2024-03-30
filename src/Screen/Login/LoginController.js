import axios from "axios"
import { useContext, useEffect } from "react"
import { URL, endpoint } from "../../Helpers/Api"
import { HelperHeader } from "../../Helpers/HelperHeader"
import { LoginContext } from "../../context/Login"
import HelperTarjeta from "../../Helpers/HelperTarjeta"

export const  LoginController = async (password , usuario) => {
    const {setCredenciales} = useContext(LoginContext)
    const [loaded, setLoaded] = useState(false);
    
    if (password.length > 0 && usuario.length > 0) {
      setLoaded(true);
      const headers = {
        "Content-Type": "application/json",
         Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };


      try {
        const respuesta = await axios.post(`${URL.UrlBase}${endpoint.LOGIN}`,
          {
            NombreUsuario: usuario.trim(),
            Password: password.trim(),
          },
          {
            headers,
          }
        ) 
       
        if(respuesta.data.CodRespuesta === "0000")
        {
          setCredenciales({ ...respuesta.data, password: password.trim() });
        
           // navegacion.navigate("HOMES");
        }

      } 
      catch (error) {

        setCth(true);
        setTextError("error del servidor al momento de obtener datos hacer login (" + error + ")");

      }
      finally{
        setLoaded(false)
      }
    

        
    } else {
      setTarjeta("Los campos no pueden estar vacíos");
      setLoaded(false);
    }
  };

import axios from "axios";
import { endpoint, headers } from "../Helpers/Api";

export async function httpLogin({
  usuario,
  password,
  setError,
  setLoaded,
  setAlert,

 
}) {  

  if(usuario.length < 10 ){
    setError('EL número telefónico debe contener  10 dígitos.');
    setAlert(true);
    return 0;
  }

  if( usuario.length > 0 && password.length > 0){
    try{
      setLoaded(true);
      const response = await axios.post( endpoint.LOGIN , 
        {
          NombreUsuario: usuario.trim(),
          Password: password.trim(),
        },
        {
          headers,
        }
      );
      
     
      if(response.data.CodRespuesta === "0000"){
        return {
            data:response.data,
            status:true
        };
      }else{
        setAlert(true);
        setError(
          'Favor de revisar la información. Si es la primera vez que utilizas tu aplicación, regístrate desde el botón "Registrarme" '
        );
        return false;
      }
      
      
    }catch(error){
      setError( "error del servidor al momento de obtener datos hacer login (" + error +")");
      return 0;
    }finally{
      setLoaded(false);
    }
    
  }else{
    setError("Los campos no pueden estar vacíos");
    setAlert(true);
  }
 


}

//calcular comisiones
export async function httpComisiones({
  Token,
  Tarjeta,
  MedioAcceso,
  TipoMedioAcceso,
  ConceptoPago,
  Importe,

})
{
  try {
    let headersToken = {...headers, "Authorization": `Bearer ${Token}`,}
    const response = await axios.post(endpoint.COMISION,
      {
        Tarjeta,
        MedioAcceso,
        TipoMedioAcceso,
        ConceptoPago,
        Importe
      },
      {
        headers: headersToken,
      }
    )

    return await response.data;
    console.log(response.data)
  } catch (error) {
      console.log(error);
  }
}

//hacer transferencia
export async function  httpTransferencia({})
{
  try {
       let headersToken = {...headers, "Authorization": `Bearer ${Token}`,}
      axios.post(endpoint.TRANSFERENCIA,
        {
          Tarjeta:"0123456000557534",
          MedioAcceso: "",
          TipoMedioAcceso:"",
          ConceptoPago: "Prueba transferencia externa",
          CuentaBeneficiario: "002180332600200185",
          Monto: 150,
          ReferenciaNumerica: "1234567"
        },
        {

          headersToken,
        }
      )
  } catch (error) {
    console.log(error);
  }
}




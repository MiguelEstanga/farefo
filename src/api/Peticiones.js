
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
        console.log(response.data);
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
export async function  httpTransferencia({
  Token,
  setLoaded,
  Tarjeta,
  ConceptoPago,
  CuentaBeneficiario,
  Monto,
  referencias
})
{
  let headersToken = {...headers, "Authorization": `Bearer ${Token}`,}
  console.log('trasfiriendo' , headersToken)
  setLoaded(true);
  try {
     const response = await axios.post(endpoint.TRANSFERENCIA,
        {
          Tarjeta:Tarjeta,
          MedioAcceso: "",
          TipoMedioAcceso:"",
          ConceptoPago: ConceptoPago,
          CuentaBeneficiario: CuentaBeneficiario,
          Monto: Monto,
          ReferenciaNumerica: parseFloat(referencias)
        },
        {
          headers:headersToken,
        }
      )
      return response.data;
      console.log(response.data)
  } catch (error) {
    console.log('error ' . error);
  }finally{
    setLoaded(false);
  }
}




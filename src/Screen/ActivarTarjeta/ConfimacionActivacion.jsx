import { View, Text } from "react-native";

import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState , useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../context/Login";
import { ModalAlert } from "../../component/Modal";
import axios from "axios";
import { TarjetaContext } from "../../context/Tarjeta";
import Loaded from "../../component/Loaded";
import { StatusContext } from "../../context/StatusContex";
function ConfimacionActivacion() {
    const {setStatus}  = useContext(StatusContext)
    const [password , setPassword] = useState("");
    const {credenciales} = useContext(LoginContext);
    const [modal , setModal ] = useState(false);
    const  {tarjeta} = useContext(TarjetaContext);
     const [loaded , setLoaded] = useState(false)
  useEffect(()=>{ 
  
  } , [password])
   const navegacion =  useNavigation()

   const confirmar = () =>{
      if(credenciales.password.trim() === password.trim()){
        setLoaded(true)
        const headers = {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${credenciales.Token}`,
        };
        axios.post('https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ActivarTarjeta',
          {
            IDSolicitud:"",
            Folio:tarjeta.Folio,
            Tarjeta:tarjeta.Tarjeta
          },
          {
            headers
          }
        ).then(res =>{
          if( res.status == 200 )
          {
           
            if(res.data.CodRespuesta === "0000"){
              setStatus(true)
              navegacion.navigate('ActivacionExitosa')
            }
            
          }
        })
        .catch(error => console.error(error))
        .finally(res => {
          setLoaded(false)
        })
       

      }else{
        setModal(true)
      }
   }
  return (
    <View  style={{height:"100%" , backgroundColor:"#FFFFFF"}} >
      <ModalAlert
          modal={modal}
          setmodal={setModal}
          mensage={'El ID no coincide, vuelve a escribirla o comunícate con tu administrador FAREFO, vía WhatsApp al teléfono: 55 7122 6559'}
      />
      {loaded == true ? (<Loaded/>) : ""}
      <View
        style={{
          width: "100%",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "#444444",
            textAlign: "justify",

            width: "90%",
          }}
        >
          Para poder activar tu tarjeta escribe la contraseña con la cual te diste de alta en la aplicación.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <InputText
            label={'Contraseña'}
            placeholder={'******'}
            password={true}
            initPassword={true}
            eventoText={setPassword  }
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 70,
        }}
      >
        <Btn
          color={"#152559"}
          texto={"Continuar"}
          evento={() => {confirmar()}}
          
        />
      </View>
    </View>
  );
}

export default ConfimacionActivacion;

import { View, Text, Modal, TextInput } from "react-native";

import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";
import { ModalAlert } from "../../component/Modal";
import { NipContext } from "../../context/NIP";
import axios from "axios";
import Loaded from "../../component/Loaded";
;
function ConfirmacionNip() {
  const [password, setPassword] = useState("");
  const [error , setError] = useState(false)
  const [text , setText] = useState("")
  const [loaded , setLoaded] = useState(false)
  const { credenciales } = useContext(LoginContext);
  const {setNip}  = useContext(NipContext)
   const {tarjeta} = useContext(TarjetaContext)
  const [modal, setModal] = useState(false);
  const navegacion = useNavigation();

  const nip_consulta = () => {
    if (credenciales.password === password) {
    
      const headers = {
        "Authorization": `Bearer ${credenciales.Token}`,
      };
      setLoaded(true)
      axios
        .post(
          "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ConsultaNIP",
          {
            "IDSolicitud":"1",
            "Tarjeta":tarjeta.Tarjeta,
            "MedioAcceso":"",
            "TipoMedioAcceso":""
          },
          {
            headers,
          }
        )
        .then((res) => {
            if(res.status == 200)
            {
              console.log(res.data)
              setNip({...res.data})
              navegacion.navigate('NIP')
            }


           
        })
        .finally(res => {
          setLoaded(false)
          
        })
        .catch(error =>{ 
            setText("error del servidor ("+error+")  intentelo mas tarde ")
            setError(true) 
          })
    } else {
        setModal(true)
        
    }
  };

  
  return (
    <View style={{height:"100%"}} >
      {
        loaded == true ? ( <Loaded/>) : ""
      }
        {
          error == true ? (<ModalAlert  mensage={text} modal={error} setModal={setError} />):''
        }
        <ModalAlert
          modal={modal}
          setmodal={setModal}
          mensage={
            "Contraseña incorrecta"
          }
        />
   

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
            fontWeight: "300",
            color: "#444444",
            textAlign: "justify",

            width: "90%",
          }}
        >
          Para poder visualizar tu NIP escribe la contraseña con la cual te
          diste de alta en la aplicación.
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
          label={"Contraseña"}
          placeholder={"******"}
          password={true}
          eventoText={setPassword}
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
          evento={() => nip_consulta()}
        />
      </View>
    </View>
  );
}

export default ConfirmacionNip;

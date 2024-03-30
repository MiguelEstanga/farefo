import { View, Text, Modal, TextInput } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../context/Login";
import { TarjetaContext } from "../../context/Tarjeta";
import { ModalAlert } from "../../component/Modal";
import axios from "axios";
import { CvvContext } from "../../context/CVV";
import Loaded from "../../component/Loaded";

function ConfirmarCvv() {
  const [password, setPassword] = useState("");
  const [loaded , setLoaded] = useState(false)
  const [text , setText] = useState("")
  const [error , setError] = useState(false)
  const {credenciales} = useContext(LoginContext)
  const {  tarjeta  } = useContext(TarjetaContext)
  const [tarjetaFisica , setTarjetaFisica] = useState()
  const {setCvv  , setCvvTime} = useContext(CvvContext)
  const [modal , setModal]  = useState(false)
  const navegacion = useNavigation();
 
  useEffect(() => {
    setTarjetaFisica(tarjeta.Tarjeta)
    
  }, [password]);

 
  

  const generar_cvv = () => {
   
    if (credenciales.password === password) {
      
      const headers = {
        Authorization: `Bearer ${credenciales.Token}`,
      };
      setLoaded(true)
      axios
        .post(
          "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/GeneraCVV2Dinamico/",
          {
            IDSolicitud: "1",
            Tarjeta: "0123456000090809",
            MedioAcceso: "",
            TipoMedioAcceso: "",
          },
          {
            headers,
          }
        )
        .then((res) => {
        
          if(res.status == 200){
            console.log("tarjeta")
            console.log(tarjeta.Tarjeta )
            console.log(res.data)
            setCvv(res.data?.CodigoValidacion);
            setCvvTime(res.data?.SegundosParaExpiracion * 1000)
            navegacion.navigate("CreditoTab")
          }else{
            setText( res.status)
          }
         
       
        })
        .catch(error => {
          setError(true)
          setText("error en el servidor (" + error + ")")
        })
        .finally((res) => {
            setLoaded(false)
        });
  
    } else {
      setModal(true);
      setText('Contraseña incorrecta')
    }
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ModalAlert
        mensage={text}
        modal={modal}
        setmodal={setModal}
      />
      {
        loaded == true ? (<Loaded/>) : ''
      }
     
      {
        error == true ? (<ModalAlert mensage={text} modal={error} setmodal={setError} />):""
      }
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
          Para poder visualizar tu CVV escribe la contraseña con la cual te
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
          eventoText={ setPassword }
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
          evento={() =>  generar_cvv()}
        />
      </View>
    </View>
  );
}

export default ConfirmarCvv;

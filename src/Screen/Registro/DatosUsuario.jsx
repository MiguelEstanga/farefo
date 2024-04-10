import { View, Text } from "react-native";
import Titulo from "../../component/Titulo";
import Table from "../../component/Table";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { RegistroContext } from "../../context/Registrar";
import axios from "axios";
import Loaded from "../../component/Loaded";
import { ModalAlert } from "../../component/Modal";


function DatosUsuario() {
  
    const navegacion  = useNavigation()
    const {data , setData , telefonoC , code} = useContext(RegistroContext)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [text , setText] = useState("")
    const handle_navegacion = ()=>{
      if(data !=null ){
        navegacion.navigate("Password")
        
      }
    }
    const Tarjeta = () => {
      setLoading(true)
      const headers = {
        "Content-Type": "application/json",
        "Credenciales": "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };
      axios
        .post(
          "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ObtenerDatosTarjeta/",
          {
            TokenSMS:code,
            telefono:telefonoC,
          },
          {
            headers,
          }
        )
        .then((res) => {
            console.log(res.data)
            setData({...res.data})
          
        })
        .catch(errors => {
          setError(false)
          setText("error en el servidor (" + errors + " ) ")
        })
        .finally(res => {
          setLoading(false)
        })
    };

    useEffect(() => {
        Tarjeta()
    } , [])

  return (
    <View style={{backgroundColor:'#FFFFFF' , height:"100%"}}>
      {
        loading == true ? ( <Loaded/>) :""
      }
      {
        error == true ? (<ModalAlert mensage={text} modal={error} setmodal={setError} />) :''
      }
      <View>
        <Titulo titulo={"Confirmación de usuario"} />
      </View>
      <View style={{paddingLeft:30}} >
        <Text style={{width:296 , fontSize:16 , marginTop:10}} >
        Verifica tus datos, si hay algún error comunícate con FAREFO vía
        WhatsApp al teléfono: 55 7122 6559.
        </Text>
      </View>
      <View style={{marginTop:20}} >
            <Table
                color={'#FFFFFF'}
                titulo={'Nombre:'}
                info={`${data?.Nombre}  ${data?.ApellidoPaterno}  ${data?.ApellidoMaterno}` }
            />
             <Table
                color={'#E5E7ED'}
                titulo={'Teléfono:'}
                info={data?.Telefono}
            />
             <Table
                color={'#FFFFFF'}
                titulo={'Correo Electrónico:'}
                info={data?.Correo}
            />
      </View>
      <View style={{justifyContent:"center" , alignItems:"center" , marginTop:50}} >
        <Btn
            texto={'Continuar'}
            color={"#152559"}
            evento={handle_navegacion}
        />
      </View>
     
    </View>
  );
}

export default DatosUsuario;

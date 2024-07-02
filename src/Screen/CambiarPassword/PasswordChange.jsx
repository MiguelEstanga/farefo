import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Titulo from "../../component/Titulo";
import { useState ,useContext } from "react";
import ModalCodigo from "../../component/ModalCodigo";
import Btn from "../../component/Btn"
import { useNavigation } from "@react-navigation/native";
import InputText from "../../component/InputText";
import { RegistroContext } from "../../context/Registrar";
import axios from "axios";
import { ModalAlert } from "../../component/Modal";
import Loaded from "../../component/Loaded";
function Telefono() {

    const navegacion =  useNavigation()
    const { setCode , setTelefonoC}  =  useContext(RegistroContext)
    const [telefono , setTelefono] = useState('')
    const [loaded , setLoaded] = useState(false)
    const [modal , setModal] = useState(false)
    const [campo , setCampo] = useState(false)
    const [error , setError] = useState('')
    
  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handle_navegacion = ()=>{
    navegacion.navigate("Registro")
  }

  const registro = ()=>{
    
    setTelefonoC(telefono)
    
    if(telefono.length == 0 ){
      
      setCampo(true)
    }else{
      setLoaded(true)
      
      const headers = {
        "Content-Type": "application/json",
        "Credenciales": "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };
      axios
        .post(
          "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/EnviarSMSOnb",
          {
              "Usuario":telefono,
              "Telefono":telefono
          },
          {
            headers,
          }
        )
        .then((res) => {
         
        
          if(res.data.CodigoRespuesta === "0"){
            
            setCode(res.data.Token)
            navegacion.navigate("CodeChangePassword")
          }else{
            setModal(true)
            setError("Número no valido")
          }
        })

        .catch(error => {
          setError('error del servidor ' + error)
        })
        .finally(res => {
          setLoaded(false)
          
          
        })
    }
  }

  return (
    <View  style={{backgroundColor:"#FFFFFF" , height:"100%"}} >
      {
        loaded === true ? (   <Loaded

          />) :""
      }
  
      <ModalAlert
        modal={modal}
        setmodal={setModal}
        mensage={error}
        
      />

      <ModalAlert
        modal={campo}
        setmodal={setCampo}
        mensage={'Campo vacio'}
      />
        <Titulo
            titulo={'Escribe tu teléfono'}
        />
        <View style={{width:"100%" , alignItems:"center", marginTop:10}} >
            <Text style={style.text} >
            Captura el número de teléfono con el que te registraste en la página de FAREFO.
            </Text>
        </View>
        <View style={{alignItems:"center"}}>
            <InputText
                initPassword={false}
                label={''}
                password={false}
                eventoText={setTelefono}
                value={telefono}
                longitud={10}
                number={true}
            />
        </View>
        <View style={{width:"100%" , alignItems:"center" , marginTop:40}} >
            <Btn
                texto={'Continuar'}
                color={'#152559'}
                evento={()=> registro() }
            />
        </View>
    </View>
  );
}

const style = StyleSheet.create({
  text:{
    width:300,
    fontSize:16
  }
});
export default Telefono;

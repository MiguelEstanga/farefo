import { StyleSheet, View } from "react-native";
import Titulo from "../../../component/Titulo";
import InputText from "../../../component/InputText";
import Btn from "../../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { ModalAlert } from "../../../component/Modal";

export default function Tranferir() 
{
    const [alert , setAlert] = useState(false)
    const {tranferencia , setTranferencia } =useContext(TranferenciaContext)
    const navegacion = useNavigation()

    useEffect(()=> {

    } , [tranferencia])
    const handle_navegacion = ()=>{
        if(tranferencia?.nombre && tranferencia?.clabe && tranferencia?.alias){
         // navegacion.navigate("Monto")
              navegacion.navigate("Monto") 
        }
        else {
          setAlert(true)
        }
       // 
    }
  return (
    <View style={style.container}>
      <ModalAlert
          setmodal={setAlert}
          modal={alert}
          mensage="Por favor, complete el formulario"
      />
      <Titulo titulo={"¿A quién deseas transferir?"} />

      <View  style={{ height:300 , alignItems:"center" , marginTop:30}} >
        <View style={style.input}>
          <InputText 
             value={tranferencia?.clabe ?? ''}
            number={true}
            longitud={18}
            label={"Clabe"} 

            eventoText={(text ) => { setTranferencia({...tranferencia , clabe:text}) }}
            password={false}
            initPassword={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
             value={tranferencia?.nombre ?? ''}
            label={"Nombre del contacto"} 
            eventoText={ (nombre) => { setTranferencia({...tranferencia , nombre:nombre}) }}
            password={false}
            initPassword={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            value={tranferencia?.alias ?? ''}
            label={"Alias"} 
            eventoText={(alias) => { setTranferencia({...tranferencia , alias:alias}) }}
            password={false}
            initPassword={false}
          />
        </View>
      </View>
      <View style={{justifyContent:"center" , alignItems:"center"}} >
        <Btn
            color={'#152559'}
            texto={"Continuar"}
            evento={ handle_navegacion}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop:30,
    width: "100%",
    height: "100%",
  },
  input:{
    
    
    height:100
  }
});

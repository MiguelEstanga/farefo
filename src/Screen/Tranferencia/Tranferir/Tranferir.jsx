import { StyleSheet, View } from "react-native";
import Titulo from "../../../component/Titulo";
import InputText from "../../../component/InputText";
import Btn from "../../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Tranferir() 
{
    const [clabe , setClabe] = useState("")
    const [alias , setAlias] = useState("")
    const [nombre , setNombre] = useState("")
    const navegacion = useNavigation()
    const handle_navegacion = ()=>{
        navegacion.navigate("Monto")
    }
  return (
    <View style={style.container}>
      <Titulo titulo={"¿A quién deseas transferir?"} />

      <View  style={{ height:300 , alignItems:"center" , marginTop:30}} >
        <View style={style.input}>
          <InputText 
            label={"CLABE"} 
            eventoText={setClabe}
            password={false}
            initPassword={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            label={"Nombre del contacto"} 
            eventoText={setNombre}
            password={false}
            initPassword={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            label={"Alias"} 
            eventoText={setAlias}
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

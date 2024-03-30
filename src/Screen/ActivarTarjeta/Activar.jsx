import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TarjetaContext } from "../../context/Tarjeta";
import { ModalAlert } from "../../component/Modal";

function Activar() {
  const [modal, setModal] = useState(false);
 
  const [tarjetaInput , setTatrjeta] = useState("")
  const {tarjeta } = useContext(TarjetaContext)
  const [codigo, setCodigo] = useState(false)
  const navegacion = useNavigation()

  useEffect(() => {
    console.log(tarjeta)
  }, [modal]);

  const activar = ()=>{
  
    if(tarjeta.Folio === tarjetaInput.trim()){
       navegacion.navigate('ConfirmarActivacion')
    }else{
      setCodigo(true)
    }
 
   
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          codigo == true ? ( <ModalAlert  mensage={'código de tarjeta incorrecta'} modal={codigo} setmodal={setCodigo} /> ) : ''
        }
        
        <View style={style.contenLeyecnda}>
        <Titulo  mizquierdo={1} titulo={"Escribe el ID de tu tarjeta"} />
          <Text style={style.leyenda}>
           
            Captura el número que está impreso en la etiqueta en el anverso de
            tu tarjeta
          </Text>
        </View>

        <View style={style.tarjeta}>
          <Image
            source={require("../../../assets/png/ActivarTarjeta.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
            }}
          />
        </View>
        <View style={{ height: 100 }}>
          <InputText 
            label={"ID de tarjeta"}
            eventoText={setTatrjeta} 
            password={true}
            placeholder={"Texto"}
            number={true}
            longitud={7}
          />
        </View>
      </View>
      <View style={style.btnContainer}>
        <Btn 
          color={"#152559"} 
          texto={"Continuar"} 
          evento={()=> activar()}
        />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  contenLeyecnda: {
    paddingLeft: 30,
    marginTop: 20,
    width: "100%",
   
  },
  leyenda: {
    color: "#444444",
    fontWeight: "400",
    fontSize: 16,
    textAlign:"left",
    
  },
  tarjeta: {
    width: 286,
    height: 347,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Activar;

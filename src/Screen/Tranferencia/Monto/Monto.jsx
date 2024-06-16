import { StyleSheet, TouchableOpacity, View , Text} from "react-native";
import Titulo from "../../../component/Titulo";
import CreditoInfo from "../../../component/CreditoInfo";
import InputText from "../../../component/InputText";
import Btn from "../../../component/Btn";
import { useContext, useState } from "react";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { useNavigation } from "@react-navigation/native";
function Monto() {
  const navegacion = useNavigation();
  const { setTranferencia , tranferencia } = useContext(TranferenciaContext);
  return (
    <View>
      <View>
        <Titulo titulo={"¿Cuánto deseas transferir?"} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CreditoInfo />
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={style.input}>
          <InputText 
            label={"Monto"} 
            eventoText={(Monto) =>  setTranferencia({...tranferencia , monto:Monto})}
            initPassword={false}
            password={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            label={"Concepto"} 
            eventoText={(conceptop) =>  setTranferencia({...tranferencia , concepto:conceptop})}
            initPassword={false}
            password={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            label={"Referencia"} 
            eventoText={(referencia) => setTranferencia({...tranferencia , referencia:referencia})}
            initPassword={false}
            password={false}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row",  alignItems:"center", justifyContent:"center" , gap:10 }}>
            <TouchableOpacity style={{ justifyContent:"center" , alignItems:"center", width:"40%" , height:40 , borderRadius:8 , backgroundColor:"#D1103A" } } >
                <Text style={{color:"#FFFFFF" , fontSize:16 }}  >
                    Regresar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navegacion.navigate("Confirmacion") }}
                style={{ justifyContent:"center" , alignItems:"center", width:"40%" , height:40 , borderRadius:8 , backgroundColor:"#152559" } } >
                <Text style={{color:"#FFFFFF" , fontSize:16 }}  >
                Continuar
                </Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    height: 80,
  },
});
export default Monto;

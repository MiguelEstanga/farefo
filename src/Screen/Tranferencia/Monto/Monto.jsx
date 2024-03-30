import { StyleSheet, TouchableOpacity, View , Text} from "react-native";
import Titulo from "../../../component/Titulo";
import CreditoInfo from "../../../component/CreditoInfo";
import InputText from "../../../component/InputText";
import Btn from "../../../component/Btn";

function Monto() {
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
          <InputText label={"Monto"} />
        </View>
        <View style={style.input}>
          <InputText label={"Concepto"} />
        </View>
        <View style={style.input}>
          <InputText label={"Referencia"} />
        </View>
      </View>
      <View style={{ flexDirection: "row",  alignItems:"center", justifyContent:"center" , gap:10 }}>
            <TouchableOpacity style={{ justifyContent:"center" , alignItems:"center", width:"40%" , height:40 , borderRadius:8 , backgroundColor:"#D1103A" } } >
                <Text style={{color:"#FFFFFF" , fontSize:16 }}  >
                    Regresar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent:"center" , alignItems:"center", width:"40%" , height:40 , borderRadius:8 , backgroundColor:"#152559" } } >
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

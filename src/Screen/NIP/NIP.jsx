import { Text, View } from "react-native";

import Btn from "../../component/Btn";
import { useNavigation} from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { NipContext } from "../../context/NIP";

function NIP() {
  const navgacion = useNavigation();
  const {nip} = useContext(NipContext)
  const handel_cerrar = () => {
    navgacion.navigate("CreditoTab");
  };
  useEffect(()=>{
    
  })
  return (
    <View>
      {nip.NIP ? (
          <Text style={{ fontSize: 117, color: "#152559", textAlign: "center" }}>
          {nip.NIP ?? ""}
        </Text>
      ):(
        <Text style={{
          textAlign:"center",
          marginTop:30,
          marginBottom:30,
          fontSize:20
        }} >
          {nip.DescRespuesta ?? ""}
        </Text>
      )
      }
      
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Btn
          texto={"Cerrar"}
          color={"#D1103A"}
          evento={() => navgacion.navigate("Informacion") }
        />
      </View>
    </View>
  );
}

export default NIP;

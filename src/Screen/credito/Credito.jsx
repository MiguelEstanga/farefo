import { ScrollView, StyleSheet, View } from "react-native";
import BtnNavegacion from "../../component/BtnNavegacion";
import CreditoInfo from "../../component/CreditoInfo";
import TarjetaFisica from "../../component/Tarjeta";

function Credito() {
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
      <View>
          <TarjetaFisica />
        </View>
        <CreditoInfo />
       

        <View style={style.contenBtn}>
          <BtnNavegacion
            imagen={require("../../../assets/png/info_tarjeta.png")}
            navegacion={'Informacion'}
          />
          <BtnNavegacion
            imagen={require("../../../assets/png/consulta_tarjeta.png")}
            navegacion={'Movimientos'}
          />
          <BtnNavegacion
            imagen={require("../../../assets/png/activar_tarjeta.png")}
            navegacion={"Activar"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  contenBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    gap: 10,
    marginTop: 20,
  },
});

export default Credito;

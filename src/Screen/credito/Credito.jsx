import { ScrollView, StyleSheet, View } from "react-native";
import BtnNavegacion from "../../component/BtnNavegacion";
import CreditoInfo from "../../component/CreditoInfo";
import TarjetaFisica from "../../component/Tarjeta";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";
import { StatusContext } from "../../context/StatusContex";

function Credito() {
  //const [status , setStatus] = useState()
  const {tarjeta} = useContext(TarjetaContext)
  const {credenciales} = useContext(LoginContext)
  const {state , status} =  useContext(StatusContext)
    
  useEffect(() => {
    console.log("estado" , state)
  }, [state , status ])

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
          {
            status === true ? null : (  <BtnNavegacion
              imagen={require("../../../assets/png/activar_tarjeta.png")}
              navegacion={"Activar"}
            />)
          }
        
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

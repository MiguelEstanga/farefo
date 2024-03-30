import { View, Text, StyleSheet } from "react-native";
import {useContext, useEffect} from 'react'
import { TarjetaContext } from "../context/Tarjeta";
function CreditoInfo() {
   const {tarjeta} = useContext(TarjetaContext)
   useEffect(() => {
    
   }, []) 
  return (
    <View style={style.container}>
      <Text style={style.Text}>Tu crédito</Text>
      <View style={style.contenedor}>
        <View style={style.disponible}>
          <Text style={style.text}>Crédito</Text>
          <Text style={style.numero}>${tarjeta.LimiteCredito}</Text>
        </View>
        <View style={style.disponible2}>
          <Text style={style.text}>Disponible</Text>
          <Text style={style.numero}>${tarjeta.SaldoDisponible}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  numero: {
    fontSize: 25,
    color: "#2F3D6B",
    fontWeight:'600'
  },
  container: {
    padding: 10,
    height: 142,
    width: "95%",
    marginTop: 20,
    backgroundColor: "#E5E7ED",
    borderRadius: 10,
  },
  Text: {
    color: "#D62B50",
    textAlign: "center",
    fontSize: 26,
    fontWeight:"500"
  },
  contenedor: {
    flexDirection: "row",
    marginTop: 10,
  },
  disponible: {
    width: "50%",
    padding: 5,
    borderRightWidth: 1,
  },
  disponible2: {
    width: "50%",
    padding: 5,
    marginLeft: 20,
  },
  text: {
    fontSize: 15,
    color: "#8B8B8B",
    fontWeight: "300",
    width: "50%",
  },
});
export default CreditoInfo;

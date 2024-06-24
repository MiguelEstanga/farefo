import { View, Text, StyleSheet } from "react-native";
import {useContext, useEffect} from 'react'
import { TarjetaContext } from "../context/Tarjeta";
import { Dimensions } from 'react-native';  
const screenWidth = Dimensions.get('window').width;
function CreditoInfo() {
   const {tarjeta} = useContext(TarjetaContext)
  
   useEffect(() => {
    
   }, [tarjeta]) 

   function agregarComas(numero = 0) {
    const cadenaNumero = numero;
    
    const parteEntera = cadenaNumero.split('.')[0]
    const parteDesimal = cadenaNumero.split('.')[1] ?? '00'
    const grupos = [];
    let grupoActual = '';
    for (let i = parteEntera.length - 1; i >= 0; i--) {
        grupoActual = cadenaNumero[i] + grupoActual;
        if (grupoActual.length === 3 || i === 0) {
            grupos.unshift(grupoActual);
            grupoActual = '' ;
        }
    }
    
    const parseSifra = `${grupos.join(',')}.${parteDesimal}`
    // Une los grupos con comas y devuelve el resultado
    return parseSifra ;
  }
  return (
    <View style={style.container}>
      <Text style={style.Text}>Tu crédito</Text>
      <View style={style.contenedor}>
        <View style={style.disponible}>
          <Text style={style.text}>Crédito</Text>
          <Text style={style.numero}>${agregarComas(tarjeta.LimiteCredito)}</Text>
        </View>
        <View style={style.disponible2}>
          <Text style={style.text}>Disponible</Text>
          <Text style={style.numero}>${agregarComas(tarjeta.SaldoDisponible)}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  numero: {
    fontSize:  screenWidth * 0.05 ,
    color: "#2F3D6B",
    fontWeight:'600',
    marginTop:4
  },
  container: {
    padding: 10,
    height: 142,
    width:  screenWidth < 385 ? "90%" : 385,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
    padding: 6,
    borderRightWidth: 1,
  },
  disponible2: {
    width: "50%",
    padding: 6,
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

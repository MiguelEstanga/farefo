import { View, Text, StyleSheet } from "react-native";
import {useContext, useEffect, useState} from 'react'
import { TarjetaContext } from "../context/Tarjeta";
import { Dimensions } from 'react-native';  
import { TranferenciaContext } from "../context/Tranferencia";
const screenWidth = Dimensions.get('window').width;
function CreditoInfo({
  texCredito = 'Crédito',
  textDisponible = 'Disponible',
  esMonto = false,
}) {
   const {tarjeta} = useContext(TarjetaContext)
   const {tranferencia , setAvanzar} = useContext(TranferenciaContext)
   const [despuestDeLaTranferencia , setdespuestDeLaTranferencia] = useState('0')
   useEffect(() => {
    if(tranferencia.monto === '0' || tranferencia.monto.length === 0 ){
      setdespuestDeLaTranferencia('0')
    }else{
      setdespuestDeLaTranferencia(  tarjeta.SaldoDisponible - tranferencia.monto   ) 
      console.log(typeof despuestDeLaTranferencia.toString() )
    }
    if( parseInt(tarjeta.SaldoDisponible) < parseInt(tranferencia.monto)){
      setAvanzar(true)
      setdespuestDeLaTranferencia("0")
    }else{
      setAvanzar(false)
    }
    
   }, [tarjeta, tranferencia.monto]) 


  function agregarComas(numero = 0) {
    const cadenaNumero = numero.toString();
    if (cadenaNumero.length === 0) {
      cadenaNumero = "0";
    }
  
    const partes = cadenaNumero.split(".");
    const parteEntera = partes[0];
    let parteDecimal = partes[1] || "00";
    // Redondear y rellenar la parte decimal
    parteDecimal = parteDecimal.slice(0, 2).padEnd(2, "0");
    const grupos = [];
    let grupoActual = "";
    for (let i = parteEntera.length - 1; i >= 0; i--) {
      grupoActual = parteEntera[i] + grupoActual;
      if (grupoActual.length === 3 || i === 0) {
        grupos.unshift(grupoActual);
        grupoActual = "";
      }
    }
  
    const resultado = grupos.join(",") + "." + parteDecimal;
    return resultado;
  }
  return (
    <View style={style.container}>
      <Text style={style.Text}>Tu crédito</Text>
      <View style={style.contenedor}>
        <View style={style.disponible}>
          <Text style={style.text}>{texCredito}</Text>
          <Text style={style.numero}>
            ${ 
              esMonto === false ?  
              agregarComas(tarjeta.LimiteCredito) : 
              agregarComas(tarjeta.SaldoDisponible)
             }
          </Text>
        </View>
        <View style={style.disponible2}>
          <Text style={style.text}>{textDisponible}</Text>
          <Text style={{
             fontSize:  screenWidth * 0.05,
             color: parseFloat(tarjeta.SaldoDisponible) < parseFloat(tranferencia.monto) ? "#2F3D6":"#2F3D6B",
             fontWeight:'600',
             marginTop:4,
             fontSize: parseFloat(tarjeta.SaldoDisponible) < parseFloat(tranferencia.monto)  ?  25 : 25,
          }}>
            ${
              esMonto === false ?
              agregarComas(tarjeta.SaldoDisponible):
              agregarComas(despuestDeLaTranferencia.toString())
             }
           </Text>
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
    width:  screenWidth < 385 ? "95%" : 385,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    shadowOpacity: 1,
    elevation: 5,
    
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
    fontSize: screenWidth < 385 ? 12 : 15,
    color: "#8B8B8B",
    fontWeight: "300",
    width: "100%",
   
  },
});
export default CreditoInfo;

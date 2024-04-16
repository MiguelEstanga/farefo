import { StyleSheet, Text, View } from "react-native";
import CreditoInfo from "../../component/CreditoInfo";
import SwiperComponent from "../../component/Carrucel";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/Login";
import { StatusContext } from "../../context/StatusContex";

function Home() {
  const {credenciales} = useContext(LoginContext)
  const {handleStatus} = useContext(StatusContext)
  useState(()=>{
    handleStatus()
  } , [credenciales])
  return (
    <View style={style.container}>
      <View style={style.avatar}>
        <View style={style.circulo}></View>
        <View style={style.nombre}>
          <Text style={{ fontSize: 23, color:"#152559"}}>Hola, {credenciales.NombreUsuario}</Text>
        </View>
      </View>
      <CreditoInfo />
      <View style={style.etiqueta}>
        <View style={style.etiquetaText}>
          <Text style={{fontSize:25, color:"#FFFFFF" , textAlign:"center"}} >Productos FAREFO</Text>
        </View>
      </View>
      <View style={style.carrucel} >
        <SwiperComponent/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
    carrucel:{
       
        width:"95%",
        marginTop:40,
        height:278
    },
  etiqueta: {
    width: "100%",
    marginTop: 30,
  },
  etiquetaText: {
    backgroundColor: "#152559",
    width: "70%",
    height: 38,
  },
  container: {
    width: "100%",
    height: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: "70%",
    flexDirection: "row",
    gap: 10,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 100,
    backgroundColor: "#152559",
  },
  nombre: {
    fontSize: 25,
    justifyContent: "center",
  
  },
});
export default Home;

import { ScrollView, StyleSheet, View } from "react-native";
import BtnNavegacion from "../../component/BtnNavegacion";
import CreditoInfo from "../../component/CreditoInfo";
import TarjetaFisica from "../../component/Tarjeta";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";

function Credito() {
  const [status , setStatus] = useState()
   const {tarjeta} = useContext(TarjetaContext)
    const {credenciales} = useContext(LoginContext)

    const status_tarjeta = () => {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credenciales.Token}`,
      };
      axios
        .post(
          "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ValidarTarjeta/",
          {
            "IDSolicitud": "",
            "Tarjeta": tarjeta.Tarjeta
          },
          {
            headers
          }
         
        )
        .then((res) => {
          
          if(res.status == 200){
             
              res.data.DescripcionStatus == "ACTIVA" ? setStatus(true) : setStatus(false) 
            
          }
      
        })
        .catch(error => setText("error al conectar con el servodor ("+error+")") )
        
    };

  useEffect(() => {
    
    status_tarjeta()
    
  }, [])
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
            status == true ? null : (  <BtnNavegacion
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

import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TarjetaFisica from "../../component/Tarjeta";

import InputCalendar from "../../component/InputCalendar";
import FechaRango from "./FechaRango";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Login";
import Loaded from "../../component/Loaded";
import { TarjetaContext } from "../../context/Tarjeta";
import { ModalAlert } from "../../component/Modal";
import Detalles from "./Detalles";
import { DetalleComprasContext } from "../../context/DetallesCompraContext";
function Movimientos() {
  const {credenciales} = useContext(LoginContext)
  const [respuesta , setRespuesta] = useState()
  const [modal , setModal] = useState(false)
  const [movimientos , setMovimientos] = useState([])
  const [loaded , setLoaded ] = useState(false)
  const [fecha_inicio , setFechaInicio ] = useState(fecha())
  const [fecha_fin , setFechaFin ] = useState(fecha())
  const {tarjeta} = useContext(TarjetaContext)
  const [mensage , setMensage] = useState("No hay movimientos para este periodo");
  const { 
    setShow,
    show, 
    detallesCompras,
    setDetallesCompra} = useContext(DetalleComprasContext)
  function handleShow() 
  {
    setShow(!show)
  }


  function fecha(){
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  };

 

  const handleMovimientos = ()=>{

    
    setLoaded(true)
   
    
     const headers = {
      "Content-Type" : "application/json",
      Authorization: `Bearer ${credenciales.Token}`,
    };
   

    axios.post("https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ConsultarMovimientosTarjeta/",
    {
      "IDSolicitud":      "",
      "Tarjeta":          tarjeta.Tarjeta,//tarjeta.Tarjeta,
      "FechaInicial":     `${fecha_inicio}`,
      "FechaFinal":       `${fecha_fin}`,
      "MaxMovimientos":   "",
      "MedioAcceso":      "",
      "TipoMedioAcceso":  ""
      
    },
    {
      headers
    }
    ).then(res => {
     
      setMovimientos(res.data.Movimientos)
      if(res.data.Movimientos == null)
      {
         
          setMensage(res.data.DescRespuesta)
          setDetallesCompra({
            ...detallesCompras,
            fechaInicial:fecha_inicio,
            FechaFinal:fecha_fin,
            
          })
       
        setRespuesta(res.data.DescRespuesta)
        setModal(true)
      }
     
    })
    .catch(error => {
      setRespuesta("ocurrio un problema con el servidor" + error)
    })
    .finally(res =>{
      setLoaded(false)
    })
  }

  
  useEffect(()=>{
    
  
    handleMovimientos()
      
  } , [])
  return (
    <View
      style={{
      
        height:"100%",
        position:"relative"
      }}
    >
        {
        loaded == true ?  <Loaded/> : ""
      }
         <ScrollView  >
    
     
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        
        <TarjetaFisica />
      </View>
      <View style={style.formulario}>
        
        <Text
          style={{
            fontSize: 26,
            color: "#D62B50",
            paddingLeft: 15,
            marginBottom: 15,
          }}
        >
          Movimientos
        </Text>
      </View>

      <View style={style.formularioCalenndar}>
        <View style={{ width: "50%", height: 40 }}>
          <InputCalendar 
            fecha={fecha_inicio} 
            label={'Fecha inicio'}
            setData={setFechaInicio}
            fechaComparativa={fecha_fin}
            exprecion={0}
          />
        </View>
        <View style={{ width: "50%", height: 40 }}>
          <InputCalendar 
            fecha={fecha_fin} 
            label={"Fecha fin"} 
            setData={setFechaFin}
            fechaComparativa={fecha_inicio }
            exprecion={1}
          />
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity 
          onPress={handleMovimientos}
          style={style.btn}>
          <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
            Consulta Movimientos
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={{justifyContent:"center"  , alignItems:"center" , marginTop:30, height:"auto" }} >
        {
           movimientos == null ? (
              <Text  style={{
                color:"#152559",
                fontSize:19,
                textAlign:"center",
                width:180,
                fontWeight:'500'
            }} >
              {mensage}
            </Text>
                         

          ) : movimientos?.map( res  => (
            <FechaRango key={res.FechaMovimiento} res={res} />
          ) )
        }
       
        
      </View>
      </ScrollView>
    </ScrollView>

    {
      show == true  ? ( <Detalles handleShow={handleShow}  data={detallesCompras} />) :""
    }
   
    </View>
   
  );
}

const style = StyleSheet.create({
  btn: {
    width: "90%",
    height: 39,
    backgroundColor: "#2F3D6B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  calendar: {
    width: "50%",

    height: 40,
    borderRadius: 4,
  },
  formularioCalenndar: {
    flexDirection: "row",
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 5,
  },
});
export default Movimientos;

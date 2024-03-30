import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import Table from "../../component/Table";
import TarjetaFisica from "../../component/Tarjeta";
import Btn from "../../component/Btn";
import { useEffect, useState, useContext } from "react";
import Confirmacion from "../../component/Confirmacion";
import { useNavigation } from "@react-navigation/native";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";
import Loaded from "../../component/Loaded";
import { NipContext } from "../../context/NIP";
import { CvvContext } from "../../context/CVV";
import { ModalAlert } from "../../component/Modal";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MasContext } from "../../context/Mas";
function Informacion() {
  const navegacion = useNavigation();
  const [activar, setActivar] = useState(false);
  const [confimacion, setConfirmacion] = useState(false);
  const { tarjeta } = useContext(TarjetaContext);
  const { credenciales } = useContext(LoginContext);
  const [status , setStatus] = useState(false)
  const [error, setError] = useState(false);
  const [text , setText] = useState('')
  const [loaded, setLoaded] = useState(false);
  const [contador, setContador] = useState(3);
  const { cvv, setCvv , cvvTime } = useContext(CvvContext);
  const [ver , setVer] = useState(false)
  const [copiar ,setCopiar] = useState(false)
  const [run , setRun] = useState(true)
  const {setOption} = useContext(MasContext)
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${credenciales.Token}`,
  };

  const boqueo_y_desbloqueo = (mode = true) => {
    const bloqueo =
      mode == true
        ? "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/DesbloquearTarjeta"
        : "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/BloquearTarjeta";
    setLoaded(true);

    axios
      .post(
        bloqueo,
        {
          IDSolicitud: "",
          Tarjeta: tarjeta.Tarjeta,
          MedioAcceso: "",
          TipoMedioAcceso: "",
          MotivoBloqueo: "002",
        },
        {
          headers,
        }
      )
      .then((res) => {console.log(res.data)})
      .catch(error => setText("error al conectar con el servodor ("+error+")") )
      .finally((res) => setLoaded(false));
  };

  const status_tarjeta = () => {
   
    
    
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

 
  const intervalCopiarText = () => {
    setInterval(()=> {
      setCopiar(false)
    } , 2000)
  }
 
  const handleCvvTime = () => {
    const timer = setTimeout(() => {
      setCvv(null);
      
    }, cvvTime);
    // Limpia el temporizador si cvv cambia antes de que se agote el tiempo
    return () => clearTimeout(timer);
  };
  
  useEffect(() => {
    console.log("valor actual")
    console.log(cvv)
    status_tarjeta();
    if (cvv != null) { 
      console.log("valor despues del time")
      console.log(cvv)
      return handleCvvTime(); // Llama a handleCvvTime y limpia el temporizador cuando cvv cambia
    }
    if(copiar == true) return intervalCopiarText()
  }, [cvv,cvvTime]);
  
  useEffect(() => {
    console.log(cvvTime);
  }, [cvv, cvvTime , copiar. status]);
  
  
  return (
    <ScrollView>
      {

        copiar == true ?(
          <Text style={{
            textAlign:"center",
            position:"absolute",
            bottom:40,
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
            zIndex:2,
            fontSize:18,
            color:"#152559",
            fontWeight:"700" 
          }}> 
            Copiado
          </Text>
        ):""
      }

     
      {loaded == true ? <Loaded /> : ""}
     
      {
        error == true ? (<ModalAlert
          mensage={text}
          setmodal={setError}
          modal={error}
        />):''
      }
      <View>
    
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TarjetaFisica />
        </View>
        <View style={style.h1}>
          <Text style={{ color: "#D62B50", fontSize: 26, fontWeight: "400" }}>
            Tarjeta Física
          </Text>
        </View>
        <Table titulo={"Nombre:"} info={`${tarjeta.Nombre} ${tarjeta.ApellidoPaterno} ${tarjeta.ApellidoMaterno} `} />
        <Table
          titulo={"Número del cliente"}
          info={tarjeta.NumeroCliente}
          color={"#B1B6C8"}
        />
        <Table
          titulo={"Tarjeta física"}
          info={tarjeta.Tarjeta}
          
          btnCopiar={true}
          setCopia={setCopiar}
        />
        <Table color="#B1B6C8" titulo={"Vigencia"} info={tarjeta.FechaVigencia} />

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Consulta de NIP</Text>
            <Text style={style.text}>Para compras en establecimientos</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={style.btn}
              onPress={() => navegacion.navigate("ConfirmacionNip")}
            >
              <Text style={{ color: "#FFFFFF" }}>Consultar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Generar CVV</Text>
            <Text style={style.text}>Para compras en líneas</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            {cvv == null ? (
              <TouchableOpacity
                style={style.btn}
                onPress={() => navegacion.navigate("ConfirmacionCVV")}
              >
                <Text style={{ color: "#FFFFFF" }}>Generar</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection:"row",
                  justifyContent:"space-between",
                  alignItems:"center",
                  padding:10
                }}
              >
                  <Text>{
                    ver == false ? "***": cvv
                  }</Text>
                  <View style={{margin:10}} >
                    {
                      ver === false ? (
                        <TouchableOpacity
                          onPress={()=> setVer(true) }
                        >
                        <AntDesign name="eye" size={24} color="black" />
                        </TouchableOpacity>
  
                      ) : (
                        <TouchableOpacity onPress={() => setVer(false) } >
                          <Ionicons name="eye-off" size={24} color="black" />
                        </TouchableOpacity>
                      ) 
                    }
                  
                   
                  </View>
               
               
              </View>
              
            )}
          </View>
        </View>

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Bloqueo de tarjeta </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              {status == true ? (
                <TouchableOpacity
                style={style.bloqueo}
                  onPress={() => {
                    
                    boqueo_y_desbloqueo(false);
                    setStatus(false);
                  }}
                >
                  <Image
                    source={require("../../../assets/png/activarOff.png")}
                  />
                  <Text style={{ color: "#444444", fontSize: 12 }}>
                     Desbloqueada
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.bloqueo}
                  onPress={() => {
                    boqueo_y_desbloqueo(true);
                    setStatus(true);
                  }}
                >
                  <Image source={require("../../../assets/png/boqueada.png")} />
                  <Text style={{ color: "#444444", fontSize: 12 }}>
                     Bloqueada
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOption(3) 
            navegacion.navigate("Mas")
          }}
          style={{
            width: "100%",
            height:27,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
           
          }}
        >
          <Image
            style={{
              width:239,
              height:27
            }}
          source={require("../../../assets/png/leyenda.png")} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  text_generar: {
    width: "63%",
  },
  btn: {
    width: 120,
    height: 28,
    backgroundColor: "#D1103A",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    height: 39,
    justifyContent: "center",
    paddingLeft: 30,
  },
  consulta: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    
  },
  titulo__: {
    color: "#152559",
    fontSize: 12,
    fontWeight: "500",
    paddingLeft: 30,
  },
  text: {
    paddingLeft: 30,
    color: "#444444",
    fontSize: 12,
    fontWeight: "400",
  },
  bloqueo:{
   
    flexDirection:"row",
    gap:4,
    alignItems:"center"
  }
});
export default Informacion;

import { useContext, useEffect, useState } from "react";
import { View , Text  ,Dimensions ,StyleSheet , ScrollView, Image, SafeAreaView } from "react-native";
import { TranferenciaContext } from "../../../context/Tranferencia";
import Table from "../../../component/Table";
import Titulo from "../../../component/Titulo";
import { LoginContext } from "../../../context/Login";
import { TarjetaContext } from "../../../context/Tarjeta";
import { httpComisiones } from "../../../api/Peticiones";
import Btn from "../../../component/Btn";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeaderRegresar from "../../../component/HeaderRegresar";
import { useNavigation } from "@react-navigation/native";
import mostrarUltimosDigitosTarjeta from "../../../Helpers/ocultarDigitos";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Detalles() {
  const  {tranfereciaDatosExitoso , tranferencia ,setTranferencia } =  useContext(TranferenciaContext)
  const  {credenciales} = useContext(LoginContext)
  const  {tarjeta} = useContext(TarjetaContext)
  const navigation = useNavigation();
  const [comision, setComision] = useState(0)
  const [ivaPorcentaje, setIvaPorcentaje] = useState(0)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState({})
  const [disponible , setDisponible] = useState(false)

  async function agregarComision(){
    const data = await httpComisiones({
        Token:credenciales.Token,
        Tarjeta:tarjeta.Tarjeta,
        MedioAcceso:"",
        TipoMedioAcceso:"",
        ConceptoPago:tranferencia.concepto,
        Importe:tranferencia.monto,
    })
    console.log('data')
    console.log(tranferencia)
    console.log( parseFloat(data.IvaComision))
    if(parseFloat(data.Comision) === 0){
        setComision(0)
    }

    if( parseFloat(data.Comision) !== 0){
        setComision(tranferencia.monto / data.Comision)
    }

    if( parseFloat(data.IvaComision) !== 0){
        setIvaPorcentaje(tranferencia.monto / parseFloat(data.IvaComision))
    }

    if( parseFloat(data.IvaComision) === 0){
        setIvaPorcentaje(0)
    }

    
    setData(data)
    setTotal( parseFloat(tranferencia.monto) + parseFloat(data?.Comision) + parseFloat(data?.IvaComision) )
    if( parseFloat(tarjeta.SaldoDisponible) < parseFloat(total)  ) setDisponible(true)
} 
  useEffect( () => {
    agregarComision()
  } , [])

  return (
       
     <SafeAreaView>
            <HeaderRegresar
                flecha={false}
                image={true}
                coloHeader="#FFF"
            />
       
            <View style={ style.compartir  } >
                <View style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:10,
                    height:30,
                   
                    
                }}>
                    <Text style={style.titulo}>Comprobante de Transferencia</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Detalles")}>
                        <Image style={{width:24,height:28}} source={require("../../../../assets/png/compartir.png")} />
                    </TouchableOpacity>
                    
                </View>
                
                
            </View>
            <ScrollView
              style={{
                backgroundColor:"#FFF",
                
              }}
            >
                <Text style={style.titulosDetalles} >
                     Datos de transferencia
                </Text>
                <Table
                     color={'#FFFFFF'}
                     titulo={`Monto a transferir:`}
                     info={` $${tranfereciaDatosExitoso?.Monto ?? "no se encontro"}`}
                />
                <Table
                     color={'#EDEEF1'}
                     titulo={`Comisión ${comision}%:`}
                     info={`$${data?.Comision ?? "no se encontro"} `}
                />
                <Table
                     color={'#FFF'}
                     titulo={`Iva comisión  ${ivaPorcentaje}%:`}
                     info={` $${parseFloat(data?.IvaComision) ?? "no se encontro"}`}
                />
                <Table
                     color={'#EDEEF1'}
                     titulo={`Concepto:`}
                     info={`${tranferencia?.concepto ?? "no se encontro"}`}
                />
                
                 <Table
                     color={'#FFF'}
                     titulo={`Tipo:`}
                     info={`Spei`}
                />
                 <Table
                     color={'#EDEEF1'}
                     titulo={`Referencia:`}
                     info={`${tranferencia?.referencia ?? "no se encontro"}`}
                />
                <View style={style.ceparador} ></View>
                <Text style={style.titulosDetalles} >
                    Cuenta destino
                </Text>

               

                <Table
                     color={'#EDEEF1'}
                     titulo={`Titular:`}
                     info={`${tranfereciaDatosExitoso.NombreBeneficiario}`}
                />
                 <Table
                     color={'#FFF'}
                     titulo={`Entidad destino:`}
                     info={`Farefo`}
                />
                 <Table
                     color={'#EDEEF1'}
                     titulo={`Clabe:`}
                     info={`${mostrarUltimosDigitosTarjeta(tranferencia.clabe)}`}
                />
                 <Table
                     color={'#FFF'}
                     titulo={`Estatus:`}
                     info={`${tranfereciaDatosExitoso.Estado}`}
                />
                 <Table
                     color={'#EDEEF1'}
                     titulo={`Clave de rastreo:`}
                     info={`${tranfereciaDatosExitoso.ClaveRastreo}`}
                />
                <Table
                     color={'#FFF'}
                     titulo={`CEP:`}
                     info={`${tranfereciaDatosExitoso.CEP}`}
                />

                <View style={style.ceparador} ></View>
                 <Text style={style.titulosDetalles} >
                      Cuenta origen
                </Text>
                <Table
                     color={'#EDEEF1'}
                     titulo={`Alias:`}
                     info={`${tarjeta?.Nombre}  ${tarjeta?.ApellidoPaterno ?? "no se encontro"}`}
                />
                 <Table
                     color={'#FFF'}
                     titulo={`Entidad:`}
                     info={`FAREFO`}
                />
                 <Table
                     color={'#EDEEF1'}
                     titulo={`Tarjeta:`}
                     info={`${tarjeta?.Tarjeta ?? "no se encontro"}`}
                />
                <View
                    style={{
                        padding:20,
                        height:200,
                        justifyContent:"flex-start",
                        alignItems:"center",
                        
                    
                    }}
                >
                    <Btn
                        texto={'Cerrar'}
                        color={'#C4002E'}
                        width={170}
                        height={40}
                        evento={()=> {
                            navigation.navigate("Tranferencia")
                            setTranferencia({})
                        }}
                    />
                </View>
           
        </ScrollView>
      </SafeAreaView>
   
  );
}

const style = StyleSheet.create({
    ceparador:{
        height:1,
        marginTop:11,
        marginBottom:10,
        width:"100%",
        backgroundColor:"#B1B6C8",
    },
    titulosDetalles:{   
        color:"#D1103A",
        fontSize:17,
        fontWeight:"bold",
        position:'relative',
        top:10,
        marginTop:10,
        paddingLeft:15,
        backgroundColor:"#FFF",
        height:40,
        textAlignVertical:"center",
    },
    container:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:"#fff",
    },

    compartir:{
        
        height:40,
        backgroundColor:"#FFF",
        borderColor:"#D1103A",
        
       
    },
    titulo:{
        fontSize: windowWidth > 375 ? 20 : 18,
        fontWeight:"400"
    },
    Detalles:{
       
        borderColor:"#D1103A",
       
        marginTop:20,
        marginBottom:20,
        
    }
})
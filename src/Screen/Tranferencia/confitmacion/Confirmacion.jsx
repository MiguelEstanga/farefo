import { View , Text, SafeAreaView } from "react-native";
import Titulo from "../../../component/Titulo";
import { StyleSheet } from "react-native";
import agregarComas from "../../../Helpers/agregarComas";
import { useContext, useEffect, useState } from "react";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { LoginContext } from "../../../context/Login";
import { httpComisiones, httpTransferencia } from "../../../api/Peticiones";
import { TarjetaContext } from "../../../context/Tarjeta";
import Table from "../../../component/Table";
import { ScrollView } from "react-native-gesture-handler";
import Btn from "../../../component/Btn";
import Loaded from "../../../component/Loaded";
import { useNavigation } from "@react-navigation/native";
import HeaderRegresar from "../../../component/HeaderRegresar";
import mostrarUltimosDigitosTarjeta from "../../../Helpers/ocultarDigitos";
export default function Confirmacion() {
    const {tranferencia } =useContext(TranferenciaContext)
    const {tarjeta} = useContext(TarjetaContext)
    const {credenciales} = useContext(LoginContext)
    const [comision, setComision] = useState(0)
    const [ivaPorcentaje, setIvaPorcentaje] = useState(0)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState({})
    const [disponible , setDisponible] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navigation = useNavigation();
    
    async function agregarComision(){
        const data = await httpComisiones({
            Token:credenciales.Token,
            Tarjeta:tarjeta.Tarjeta,
            MedioAcceso:"",
            TipoMedioAcceso:"",
            ConceptoPago:tranferencia.concepto,
            Importe:tranferencia.monto,
        })
        console.log( parseFloat(data.IvaComision))
        if(parseFloat(data.Comision) === 0){
            setComision(0)
        }

        if( parseFloat(data.Comision) !== 0){
            setComision(tranferencia.monto / data.Comision)
        }

        if( parseFloat(data.IvaComision) !== 0){
            setIvaPorcentaje(tranferencia.monto / data.IvaComision)
        }

        if( parseFloat(data.IvaComision) === 0){
            setIvaPorcentaje(0)
        }

        
        setData(data)
        setTotal( parseFloat(tranferencia.monto) + parseFloat(data?.Comision) + parseFloat(data?.IvaComision) )
        if( parseFloat(tarjeta.SaldoDisponible) < parseFloat(total)  ) setDisponible(true)
    }   


    async function handleTranferir(){
        navigation.navigate('Confirmacion_tranferencia')
       
    }

    
    useEffect(()=>{
       agregarComision()
       console.log('comision')
    },[])
    return (
        <SafeAreaView>
             <View style={{
            backgroundColor:'#FFFFFF',
            height:'100%',
        }}> 
            <HeaderRegresar
                titulo="Transferencia"
                color="#152559"
                flechaColor="#D1103A"
                coloHeader="#FFF"
            />
            {loaded && <Loaded/>}
            <Text
                style={{
                    fontSize:26,
                    color:'#152559',
                    fontWeight:'600',
                    paddingLeft:20,
                }}
            >
                  Confirma tu transferencia
            </Text>
            
            <View style={style.infoMonto} >
                <Text style={{color:'#D62B50', fontSize:20, fontWeight:"400" }} >Monto a transferir:</Text>
                <View style={style.monto} > 
                    <Text 
                      style={{
                        color:'#2F3D6B', 
                        fontSize:54,
                        height:74,
                    }}>
                            ${agregarComas(parseFloat(tranferencia.monto))}
                    </Text>
                </View>
               
            </View>
            <ScrollView >
                 <View style={style.comision}>
                    <Table
                        color={'#FFFFFF'}
                        titulo={`Comisión ${comision ?? "cargando ..."}%`}
                        info={`$${ parseFloat(data.Comision)}`}
                        infoAlinacion="right"
                    />

                    <Table
                        color={'#00000012'}
                        titulo={`Iva comisión ${ivaPorcentaje}%`}
                        info={`$${parseFloat(data.IvaComision)}`}
                        infoAlinacion="right"
                    />

                    <Table
                        color={'#FFFFFF'}
                        titulo={`Total `}
                        info={`$${ agregarComas( total) }`}
                        infoAlinacion="right"
                    />
                </View>
                <View style={style.comision}>
                   
                        <Titulo
                            titulo={"Datos de la transferencia:"} 
                            fontSize={16}
                            color={'#D62B50'}
                            fontWeight="600"
                            marginTop={20}
                          
                        />
                 
                    <Table
                        color={'#FFFFFF'}
                        titulo={`Concepto`}
                        info={`${tranferencia.concepto}`}
                    />

                    <Table
                        color={'#00000012'}
                        titulo={`Vigencia`}
                        info={`${tranferencia.referencia }`}
                    />

                </View>
                <View style={style.comision}>
                    
                        <Titulo 
                            titulo={"Cuenta destino"} 
                            fontSize={16}
                            color={'#D62B50'}
                            fontWeight="600"
                            marginTop={20}
                        />
                    
                    <Table
                        color={'#FFFFFF'}
                        titulo={`Titular`}
                        info={`${tranferencia.alias}`}
                    />

                    <Table
                        color={'#00000012'}
                        titulo={`Clabe`}
                        info={`${mostrarUltimosDigitosTarjeta(tranferencia.clabe) }`}
                    />
                    <Table
                        color={'#FFFFFF'}
                        titulo={`Tipo`}
                        info={`SPEI`}
                    />
                      <Table
                        color={'#00000012'}
                        titulo={`Entidad`}
                        info={`FAREFO`}
                    />

                </View>
                <View style={style.btn}>    
                    <Btn
                        
                        color={'#D1103A'}
                        texto={"Regresar"}
                        evento={ () => navigation.goBack()}
                        width={'50%'}
                        height={32}
                    />
                     <Btn
                        evento={ () => handleTranferir()}
                        disabled={disponible}
                        color={disponible === true ? "#D1103A" : '#152559'}
                        texto={ disponible === true ? "Saldo insuficiente" : "Confirmar"}
                        
                        width={"50%"}
                        height={32}
                    />
                </View>
            </ScrollView>
               
        </View>
        </SafeAreaView>
       
    )
}

const style = StyleSheet.create({
    btn:{
        width:'90%',
       
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:1,
        padding:10,
        width:'100%',
        alignItems:'center',
        marginTop:40,
        marginBottom:30,
    },
    infoMonto:{
      borderRadius:8,
      height:100,
      marginTop:20,
      marginLeft:20,
      marginRight:20,
    },
    monto:{
       
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#D62B50',
        height:'auto',
      
    },
    comision:{
       
        width:'100%',
    },

});
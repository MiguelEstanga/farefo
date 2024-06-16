import { View , Text } from "react-native";
import Titulo from "../../../component/Titulo";
import { StyleSheet } from "react-native";
import agregarComas from "../../../Helpers/agregarComas";
import { useContext, useEffect, useState } from "react";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { LoginContext } from "../../../context/Login";
import { httpComisiones } from "../../../api/Peticiones";
import { TarjetaContext } from "../../../context/Tarjeta";
import Table from "../../../component/Table";
import { ScrollView } from "react-native-gesture-handler";
import Btn from "../../../component/Btn";
export default function Confirmacion() {
    const {tranferencia } =useContext(TranferenciaContext)
    const {tarjeta} = useContext(TarjetaContext)
    const {credenciales} = useContext(LoginContext)
    const [comision, setComision] = useState(0)

    async function agregarComision(){
        const data = await httpComisiones({
            Token:credenciales.Token,
            Tarjeta:tarjeta.Tarjeta,
            MedioAcceso:"",
            TipoMedioAcceso:"",
            ConceptoPago:tranferencia.concepto,
            Importe:tranferencia.monto,
        })

        setComision(data)
        console.log('comision', data)   
    }   


    function handleTranferir(){
        console.log('tranferir', tranferencia)
    }

    
    useEffect(()=>{
        agregarComision()
    },[])
    return (
        <View style={{
            backgroundColor:'#FFFFFF',
            height:'100%',
        }} >
            <Titulo titulo={"Confirma tu transferencia"} />
            <View style={style.infoMonto} >
                <Text style={{color:'#D62B50', fontSize:20 }} >Monto a transferir:</Text>
                <View style={style.monto} > 
                    <Text style={{color:'#2F3D6B' , fontSize:54}}>${agregarComas(tranferencia.monto)}</Text>
                </View>
               
            </View>
            <ScrollView>
            <View style={style.comision}>
                    <Table
                        color={'#FFFFFF'}
                        titulo={`Comisión ${comision.Comision}%`}
                        info={`${tranferencia.monto - comision.Comision}$`}
                    />

                    <Table
                        color={'#00000012'}
                        titulo={`Iva comisión %`}
                        info={`${comision.IvaComision}$`}
                    />

                    <Table
                        color={'#FFFFFF'}
                        titulo={`Total `}
                        info={`$${tranferencia.monto - comision.Comision}`}
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
                        info={`${tranferencia.nombre}`}
                    />

                    <Table
                        color={'#00000012'}
                        titulo={`CABLE`}
                        info={`${tranferencia.clabe }`}
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
                        evento={ agregarComision}
                        width={180}
                    />
                     <Btn
                        color={'#152559'}
                        texto={"Confirmar"}
                        evento={ () => handleTranferir()}
                        width={190}
                    />
                </View>
            </ScrollView>
               
        </View>
    )
}

const style = StyleSheet.create({
    btn:{
        width:'100%',
        
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:5,
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
      marginBottom:20,
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
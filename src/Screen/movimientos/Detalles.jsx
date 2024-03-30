import { useEffect } from "react";
import { StyleSheet, View , Text , TouchableOpacity} from "react-native";

export default function Detalles(
    {
        handleShow,       
        data 
    }
)
{
    const fechaFormat = (fecha) => {
       $format = new Date(fecha).toLocaleDateString("es-ES");
       return $format;
    }
    useEffect(() => {
        $fecha = new Date(data?.fecha).toLocaleDateString("es-ES");
        console.log($fecha)
    })
    return (
        <View
            style={
                style.container
            }
        >
            <View
                style={style.detalle}
            >
                <View style={style.conteTitulo}>
                    <Text style={style.titulo}>
                             Detalle de Compra
                    </Text>
                    <View style={style.comentario}>
                        <Text style={{fontSize:16 , fontWeight:"400" , color:"#152559"}}>
                            Comercio
                        </Text>
                        <Text style={{fontSize:16 , fontWeight:"300"}}>
                        {data?.DescripcionComercio}
                        </Text>
                    </View>
                    <View style={style.data}>
                        <View>
                            <Text style={style.textTitloData}>
                                Monto
                            </Text>
                            <Text style={{
                                fontSize:16,
                                color:"#D1103A"
                            }}>
                            -$ {data?.importe}
                            </Text>
                        </View>
                        <View>
                            <Text style={style.textTitloData}>
                            Fecha
                            </Text>
                            <Text style={{
                                fontSize:16,
                                fontWeight:"300"
                            }}>
                                { fechaFormat(data?.fecha)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={style.contenBTN}>
                    <TouchableOpacity 
                        onPress={handleShow}
                        style={style.btn}>
                            <Text 
                                style={{
                                    fontSize:14,
                                    fontWeight:"500",
                                    color:"#FFFFFF"
                                }}
                            >
                                 Cerrar
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    btn:{
        width:127,
        height:26,
        backgroundColor:"#D1103A",
        borderRadius:4,
        justifyContent:"center",
        alignItems:"center"
    },
    contenBTN:{
        width:"100%",
        height:"30%",
      
        justifyContent:"center",
        alignItems:"center"
    },
    textTitloData:{
        fontSize:16,
        color:"#152559",
        fontWeight:"500"
    },
    data:{
       
        height:80,
        width:"100%",
        marginTop:30,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:60

    },
    comentario:{
        
        width:"100%",
        paddingLeft:90
    },
    conteTitulo:{
        alignItems:"center",
        marginTop:10
    },
    titulo:{
        color:"#152559",
        fontSize:20,
        fontWeight:"700"
    },
    container:{
        borderWidth:1,
        height:"100%",
        width:"100%",
        position:"absolute",
        bottom:0,
        backgroundColor:"rgba(0,0,0,.5)",
        justifyContent:"flex-end",
       
    },
    detalle:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height:"40%",
        backgroundColor:"#FFFFFF"
    }
})
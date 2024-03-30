import { useContext, useEffect } from "react";
import { View  , StyleSheet , Text , TouchableOpacity} from "react-native";
import { DetalleComprasContext } from "../../context/DetallesCompraContext";

export default function Movimientos({nombre_movimiento , FechaMovimiento , ImporteMovimiento , DescripcionPostOperacion , DescripcionComercio})
{
    const {show , setShow, detallesCompras , setDetallesCompra} = useContext(DetalleComprasContext)
    
    return (
        
        <TouchableOpacity 
        onPress={()=> {
           setDetallesCompra({
                ...detallesCompras,
                    titulo: nombre_movimiento,
                    descripcion:DescripcionPostOperacion,
                    importe:ImporteMovimiento,
                    nombre:nombre_movimiento,
                    fecha:FechaMovimiento,
                    DescripcionComercio:DescripcionComercio
           })
           setShow(!show)
        }}
        style={style.movimientos}>
            <View style={style.fecha}>
                <Text style={style.text_fecha} >
                     {nombre_movimiento}
                </Text>
                <Text style={{color:"#616161" , fontSize:16}}>
                      {FechaMovimiento}
                </Text>
            </View>
            <View style={style.data}>
                <Text style={style.text_data} >
                    ${ImporteMovimiento}
                </Text>
                <Text style={{color:"#616161" , fontSize:16 , textAlign:"right"}}>
                     {DescripcionPostOperacion}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    movimientos:{
       
        marginTop:10,
        width:"90%",
        height:54,
        flexDirection:"row",
        borderBottomWidth:1
    },
    fecha:{

        width:"50%"
    },
    text_fecha:{
        color:"#000000",
        fontSize:16
    },
    data:{
    
       width:"50%",
     
    }, 
    text_data:{
        color:"#000000",
        fontSize:16,
        textAlign:"right"
    },
})
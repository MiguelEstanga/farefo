import { View , Text, StyleSheet} from "react-native";
import Movimientos from "./Movimiento";
import { useEffect } from "react";

export default function FechaRango({res})
{
  
    return (
    <View style={style.container}>
        <View style={style.contenido} >
            <Text style={style.titulo}>
              {res.fechaMovimiento}
            </Text>
            
        </View>
        <Movimientos 
            nombre_movimiento={res.ConceptoMovimiento} 
            FechaMovimiento={res.FechaMovimiento}
            ImporteMovimiento={res.ImporteMovimiento}
            DescripcionPostOperacion={res.DescripcionPostOperacion}
            DescripcionComercio={res.DescripcionComercio}
        />
    </View>
   )
}

const style  = StyleSheet.create({
    container:{
        width:"100%",
        alignItems:"center",
        marginTop:10,
        marginBottom:20
    },
    contenido:{
        borderWidth:1,
        width:"90%",
        
        backgroundColor:"#152559",
        height:31,
        justifyContent:"center"
    },
    titulo:{
        color:"#FFFFFF",
        marginLeft:10,
        fontSize:16
    },
 
    
})
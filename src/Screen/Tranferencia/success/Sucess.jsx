import { useContext } from "react";
import { View , Text  , Image } from "react-native";
import { StyleSheet } from "react-native";
import { TranferenciaContext } from "../../../context/Tranferencia";

export default function Sucess() {
    const {tranfereciaDatosExitoso} = useContext(TranferenciaContext)
    return(
       <View style={style.container} > 
            <View style={style.containerLogin } >
                <Image
                    source={require("../../../../assets/png/tranferencia.png")}
                />
            </View>
            <View style={style.text}>
               <Text style={{
                   fontSize:20,
                   fontWeight:400,
                   color:"#444444",
                   textAlign:"center",
               }}>
                    Se ha realizado la siguiente transferencia con éxito
               </Text>
            </View>
            <View style={style.containerPrecio}>
                <Text
                    style={{
                        fontSize:54,
                        fontWeight:400,
                        color:"#2F3D6B",
                        fontWeight:700,
                        textAlign:"center",
                    }}
                >
                    ${tranfereciaDatosExitoso.Monto}
                </Text>
                <Text
                    style={{
                        color:"#D1103A"
                    }}
                >
                    a {tranfereciaDatosExitoso.NombreBeneficiario}
                </Text>
            </View>
            <View style={style.dataTranferencia} >
                <View 
                    style={{
                        borderRightColor:"#152559",
                        borderRightWidth:1,
                        display:"flex",
                        width:"50%",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                    }}
                >
                    <Text>Estatus de transferencia</Text>
                    <Text style={style.textProceso}>En proceso</Text>
                </View>
            </View>
       </View>
    )

}

const style = StyleSheet.create({
    textProceso:{
        fontWeight:"900"
    },
    dataTranferencia:{
        
        width:'100%',
        height:100,
        borderTopColor:"#152559",
        borderTopWidth:1,
    },
    containerPrecio:{
       
        width:390,
        height:100,
        fontSize:54,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#444444",
    },
    text:{
        marginTop:40,
       
       
        width:398,
        fontWeight:500,
        color:"#fff",
        textAlign:"center",
    },
    container:{
       
        height:"100%",
        display:"flex",
        alignItems:"center",
        paddingTop:50,
    },
    containerLogin:{
        display:"flex",
        flexDirection:"center",
        justifyContent:"center",
        width:184,
        height:170,
       
    }
})
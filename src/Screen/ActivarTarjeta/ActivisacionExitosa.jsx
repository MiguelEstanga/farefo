import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ActivacionExitosa({msm}) {
    const navegacion = useNavigation()
    return (
        <View style={style.contenedor} >
            <View style={{ justifyContent:"center" , alignItems:"center" }} >
                <Image
                    style={style.marco}
                    source={require('../../../assets/png/marco.png')}
                />
                <View style={style.titulo } >
                    <Text style={{fontSize:53, color:"#FFFFFF"}} >
                        ¡Felicidades!
                    </Text>
                </View>
                <View style={style.msm } >
                    <Text style={ style.success } >
                    Tu tarjeta ha sido activada con éxito
                    </Text>
                </View>
            </View>

            <Text
                style={
                    style.btn
                }
                onPress={() => { navegacion.navigate("CreditoTab") }}
            >
                Continuar
            </Text>
        </View>
    )
}


const style = StyleSheet.create({
    contenedor: {
        backgroundColor: "#2F3D6B",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    marco: {
        borderWidth: 1,
        width: 421,
        justifyContent:"center"
    },
    btn: {
        backgroundColor: '#FFFFFF',
        width: 200,
        height: 32,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#2F3D6B",
        borderRadius: 4,
        fontSize: 16,
        justifyContent: "center",

    },
    titulo:{
        borderColor:"#FFFFF",
      
        width:322,
        height:72,
        position:'absolute',
        justifyContent:'center',
        alignItems:"center",
        top:60
    },
    success:{
        color:"#FFFFFF",
        fontSize:28,
        textAlign:"center"
    },
    msm:{
        position:"absolute",
        width:325,
        height:76,
        top:140,
    
        textAlign:'center'
    }
})
import { useContext, useEffect } from "react";
import { View , Text  , Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { useNavigation } from "@react-navigation/native";
import HeaderRegresar from "../../../component/HeaderRegresar";
import { httpTarjeta } from "../../../api/Peticiones";
import { LoginContext } from "../../../context/Login";
import { TarjetaContext } from "../../../context/Tarjeta";

export default function Sucess() {
    const {tranfereciaDatosExitoso} = useContext(TranferenciaContext)
    const {credenciales } = useContext(LoginContext)
    const { tarjeta , setTarjeta } =  useContext(TarjetaContext)
     const navigation = useNavigation();

     async function actulizarSaldo() {
        console.log('tarjeta' )
        console.log(tranfereciaDatosExitoso)
        const response = await httpTarjeta({
                Token:credenciales.token,
                usuario:tarjeta.Telefono
            })
            setTarjeta({...response})
     }
     useEffect(
        () => {
            actulizarSaldo()
        },[]
     )
    return(
       <View style={style.container} > 
            <HeaderRegresar
                  titulo='Transferencia'
                  color='#152559'
                  flechaColor='#D1103A'
            />
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
                        color:"#D1103A",
                        fontSize:18,
                        fontWeight:"300"
                    }}
                >
                    a {tranfereciaDatosExitoso.NombreBeneficiario}
                </Text>
            </View>
            <View style={style.detallesCompra} >
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("detalles")}
                        style={{
                            display:"flex",
                            
                            flexDirection:"row",
                            justifyContent:"center",
                           
                            alignItems:"center",
                        }}
                    >
                        <View style={{
                            borderBottomColor:"#2F3D6B",
                            borderBottomWidth:1,
                            width:110,
                            height:1,
                            top:20,
                            right:13,
                            position:"absolute"
                        }} >

                        </View>
                        <Image
                            style={{width:15,height:15 , position:"relative", left:10}}
                            source={require("../../../../assets/png/detalles.png")}
                        />
                        <Text style={{
                            
                            height:"auto",
                            width:140,
                            textAlign:"center",
                            
                            
                        }} >
                           
                            Ver comprobante
                            
                        </Text>
                    </TouchableOpacity>
            </View>
            <View style={style.dataTranferencia} >
                <View 
                    style={{
                        borderRightColor:"#D1103A",
                        borderRightWidth:1,
                      
                        display:"flex",
                        width:"40%",
                        height:"80%",
                        justifyContent:"start",
                        alignItems:"start",
                    }}
                >
                    <Text style={{fontSize:12}} >Estatus de transferencia</Text>
                    <Text style={style.textProceso}>{tranfereciaDatosExitoso.Estado}</Text>
                </View>
                
                <View 
                    style={{
                        borderRightColor:"#D1103A",
                      
                        paddingLeft:10,
                        display:"flex",
                        width:"40%",
                        height:"80%",
                        justifyContent:"start",
                        alignItems:"start",
                    }}
                >
                    <Text style={{fontSize:12}} >Tipo de transferencia</Text>
                    <Text style={style.textProceso}>Spei </Text>
                </View>
            </View>
       </View>
    )

}

const style = StyleSheet.create({
    textProceso:{
        fontWeight:"900",
        color:"#2F3D6B"
    },
    dataTranferencia:{
        backgroundColor:"#EDEEF1",
        width:'100%',
        height:60,
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'row',
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
        width:"90%",
        fontWeight:500,
        color:"#fff",
        textAlign:"center",
    },
    container:{
        backgroundColor:"#fff",
        height:"100%",  
        display:"flex",
        alignItems:"center",
       
    },
    containerLogin:{
        display:"flex",
        flexDirection:"center",
        justifyContent:"center",
        marginTop:50,
        width:184,
        height:170,
       
    },
    detallesCompra:{
       
        height:80,
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",    
       
       
    }
})
import { View , Text, Image} from "react-native";
import { TarjetaContext } from "../context/Tarjeta";
import {useContext, useEffect, useState}  from "react"
function TarjetaFisica() {
    const {tarjeta} = useContext(TarjetaContext)
    const [text , setText] = useState("")
    useEffect(() => {
        let resultado = "";
        const cadena = tarjeta?.Tarjeta ?? "";
        for (let i = 0; i < cadena.length; i++) {
            resultado += cadena[i];
            if ((i + 1) % 4 === 0) {
              resultado += " ";
            }
          }
          setText(resultado)
          
    })
    return ( 

        <View
            style={{
                width:349,
                height:219,
                
                marginTop:10,
                marginBottom:10
            }}
        >
            <Image
                style={{
                    width:"100%",
                    height:"100%",
                    resizeMode:"cover"
                }}
                source={ require("../../assets/png/Fisica_tarjeta.png") }
            />
            <Text
                style={{
                    position:"absolute",
                    bottom:20,
                    fontSize:27,
                    left:"14%",
                    color:"#FFFFFF",
                }}
            >
                {text}
            </Text>
        </View>
     );
}

export default TarjetaFisica;
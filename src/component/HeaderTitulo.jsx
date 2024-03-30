import { View , Text , TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function  HeaderTitulo({titulo}){
    const navegacion = useNavigation()
    return (<View  style={{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:300,
        position:"relative"
    }}>
        <TouchableOpacity 
        onPress={() => navegacion.navigate("inicio")} 
        style={{
            
            position:"absolute",
            left:0
        }}>
        <AntDesign name="arrowleft" size={24} color="#D1103A" />
        </TouchableOpacity>
        <Text
            style={{
                color:"#152559",
                fontSize:20,
                fontWeight:"500"
            }}
        >
            {titulo}
        </Text>
    </View>)
}
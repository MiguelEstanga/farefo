import { View , Text , TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

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
                fontSize: screenWidth * 0.05,
                fontWeight:"500",
               
                marginLeft:30
            }}
        >
            {titulo}
        </Text>
    </View>)
}
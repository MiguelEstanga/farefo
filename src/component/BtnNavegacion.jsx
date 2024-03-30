import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View , Image} from "react-native";

function BtnNavegacion({
    imagen,
    navegacion,
}) {

     const Navigation =  useNavigation()
    return ( <TouchableOpacity
        onPress={()=> Navigation.navigate(navegacion)}
    >
        <View style={{
            width:336,
            height:54,
            
            
        }} >
            <Image
                style={{width:"100%", height:"100%"}}
                source={imagen}
            />
        </View>
    </TouchableOpacity> );
}

export default BtnNavegacion;
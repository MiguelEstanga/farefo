import { View , Text, StyleSheet , TouchableOpacity , Clipboard} from "react-native";
import { Ionicons } from '@expo/vector-icons';
function Table({
    color,
    titulo,
    info,
    btnCopiar = false,
    setCopia,
    infoAlinacion= 'left'
}) {
    const copyToClipboard = () => {
        Clipboard.setString(info);
        console.log(info)
        setCopia(true)
    };
    return ( 
    <View
        style={{
            backgroundColor:color,
            flexDirection:'row',
            height:34,
            width:"100%",
            marginTop:5,
            alignItems:"center"
        }}
    >
      
        <View style={style.conten} >
            <Text style={style.titulo} >
                {titulo}
            </Text>
        </View>
        <View style={style.conten} >
            <Text style={{
                color:"#444444",
                fontSize:14,
                fontWeight:'400',
                textAlign:infoAlinacion,
                paddingRight:33,
                width:"100%",
            }} >
               {info}
            </Text>
            {
                btnCopiar == true ? (
                    <TouchableOpacity
                        onPress={copyToClipboard}
                    >
                         <Ionicons name="copy-outline" size={20} color="#152559" />
                    </TouchableOpacity>
                ):""
            }
           
        </View>
    </View> );
}

const style = StyleSheet.create({
    conten:{
        width:"50%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingRight:10
    },
    titulo:{
        color:"#152559",
        fontSize:14,
        fontWeight:'600',
        paddingLeft:30,
        textAlign:'left'
    },
    info:{
        color:"#444444",
        fontSize:14,
        fontWeight:'400',
        textAlign:'right',
        borderWidth:1,
        width:"100%",
    }
})
export default Table;
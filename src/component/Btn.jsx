import { TouchableOpacity , Text } from "react-native";

function Btn({
    texto,
    color,
    evento
}) {
    return ( <TouchableOpacity
        onPress={()=> evento()}
        style={
            {
                backgroundColor:color,
                width:208,
                height:40,
                borderRadius:8
            }
        }
    >
        <Text
            style={{
                width:'100%',
                height:'100%',
                fontSize:16,
                fontWeight:'500',
                color:"#FFFFFF",
                textAlign:"center",
                textAlignVertical:"center"
            }}
        >
            {texto}
        </Text>
    </TouchableOpacity> );
}

export default Btn;
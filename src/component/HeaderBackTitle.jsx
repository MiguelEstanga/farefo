import { Text, View } from "react-native";

function HeaderBackTitle({
    titulo
}) {
    return ( <View
        style={{
            width:"80%",
            justifyContent:"center",
            alignItems:"center"
        }}
    >
        <Text
            style={{
                   color:"#152559",
                   fontSize:24 ,
                   fontWeight:'500'
            }}
        >
            {titulo}
        </Text>
    </View> );
}

export default HeaderBackTitle;
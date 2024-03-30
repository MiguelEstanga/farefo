import { View, Text } from "react-native";

function Titulo({titulo , mizquierdo=30}) {
    return ( <View
        style={{
            width:"100%",
            paddingLeft:mizquierdo,
           
        }}
    >
        <Text
            style={{
                color:"#152559",
                fontSize:24,
                fontWeight:'500',
              
                width:"100%"
            }}
        >
            {titulo}
        </Text>
    </View> );
}

export default Titulo;
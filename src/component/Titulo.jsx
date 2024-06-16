import { View, Text } from "react-native";

function Titulo(
    {
        titulo , 
        mizquierdo=30 , 
        color="#152559" , 
        fontSize=24 , 
        fontWeight='500', 
        marginTop=0,
        marginBottom=0
    }
) {
    return ( <View
        style={{
            width:"100%",
            paddingLeft:mizquierdo,
            marginTop:marginTop,
            marginBottom:marginBottom,
           
        }}
    >
        <Text
            style={{
                color:color,
                fontSize:fontSize,
                fontWeight:fontWeight,
              
                width:"100%"
            }}
        >
            {titulo}
        </Text>
    </View> );
}

export default Titulo;
import { View, Text, StyleSheet } from "react-native";

export function Reporte() {
    return (
        <>
        
            <View
                style={
                    {
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }
            >

                <View style={style.container} >
                    <Text style={style.h1} >
                        ¿Qué hacer si he perdido mi tarjeta?
                    </Text>
                    <Text style={style.leyenda}>
                        Bloquea tu tarjeta desde la sección "Información de mi tarjeta" y
                        contacta con nuestro <Text style={style.color} >Centro de Atención FAREFO  </Text> al <Text style={style.color}> 55 7122 6559 </Text> o escríbenos
                        al correo <Text style={style.color} > credito@farefo.com </Text>
                    </Text>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    color: {
        color: '#152559',
        fontSize: 19,
        fontWeight: '500'
    },
    container: {

        width: "95%",
        height: 163,


        marginTop: 19,

    },
    h1: {
        color: "#152559",
        fontSize: 19,
        textAlign: "center"
    }

    ,
    leyenda: {
        marginTop: 10,
        fontSize: 19,
        color: "#444444",
        fontFamily: "Roboto",
        lineHeight: 30,
        alignItems: "center",
        textAlign: "left"
    }
})
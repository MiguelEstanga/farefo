import { View, Text, StyleSheet } from "react-native";

import { Modal } from "react-native";
export function ModalAlert({ modal , mensage  , setmodal}) {
    
    return (
        <Modal
            visible={modal}
            transparent={true}
        >
            <View style={style.modal}>
                <View style={style.confirmacion} >
                    <Text style={style.textmodal} >
                        TENEMOS UN PROBLEMA
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        padding: 10,
                        color: "#555555",
                        textAlign:"center"
                    }} >
                       {mensage}
                    </Text>
                    <Text
                        onPress={() => setmodal(false) }
                        style={{

                            backgroundColor: "#D1103A",
                            width: 126,
                            height: 27,
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "#FFFFFF",
                            borderRadius: 4,
                            marginTop: 20
                        }} >
                        Cerrar
                    </Text>
                </View>


            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    modal: {
        backgroundColor: "rgba(0,0,0,.25)",
        justifyContent: 'center',
        alignItems: "center",
        height: "100%"
    },
    confirmacion: {
        width: 304,
        minheight: '180',
        backgroundColor: "#FFFF",
        borderRadius: 8,
        fontWeight: "500",
        alignItems: "center",
        padding: 10
    },
    textmodal: {
        color: "#152559",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10
    }
});
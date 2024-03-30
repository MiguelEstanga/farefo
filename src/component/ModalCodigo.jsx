import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import { RegistroContext } from "../context/Registrar";

const ModalCodigo = ({token ,evneto , stado , setStado }) => {
  const [modalVisible, setModalVisible] = useState(stado);
 const {code } = useContext(RegistroContext)
  useEffect(() =>{} , [modalVisible , code])

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={stado}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Quieres permitir que{" "}
              <Text style={{ fontWeight: "900" }}>FAREFO</Text> lea el mensaje
              que aparece a continuación y que ingrese el código?
            </Text>
            <Text style={styles.modalText}>
              Tu Código de Validación es: {token}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop:30,
                width:"100%",
                gap:10
              }}
            >
              <TouchableHighlight
                style={styles.btnSi}
                onPress={() => {
                  setStado(false)
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Rechazar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.btnSi , backgroundColor:"#152559" }}
                onPress={() =>{ 
                  evneto()
                  setStado(false)
                  setModalVisible(!modalVisible)
                } }
              >
                <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
                  Continuar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btnSi: {
    height: 32,
    width: 160,
    borderRadius: 8,
    backgroundColor: "#D1103A",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor:'rgba(21,37,89,.4)'
  },
  modalView: {
    position: "absolute",
    bottom: 0,

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 285,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#152559",
    fontSize: 16,
  },
});

export default ModalCodigo;

import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SubmenuContext } from "../context/SubMenuContex";
import { MasContext } from "../context/Mas";
import { LoginContext } from "../context/Login";
import { StatusContext } from "../context/StatusContex";

function MenuModal() {
  const navegacion = useNavigation();
  const { setModalMenu, modal } = useContext(SubmenuContext);
  const { setOption } = useContext(MasContext);
  const { credenciales, setCredenciales } = useContext(LoginContext);
  const { setState } = useContext(StatusContext)
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={()=>{
        if(modal === true)
        {
          setModalMenu(false)
        }
      }}
    >
      
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              setModalMenu(false);
              setOption(1);
              navegacion.navigate("Mas")
            }}
            style={styles.opciones}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              source={require("../../assets/png/Perfil.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalMenu(false);
              setOption(2);
              navegacion.navigate("Mas")
            
              //navegacion.navigate('Preguntas');
            }}
            style={styles.opciones}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderEndWidth: 1,
              }}
              source={require("../../assets/png/pf.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOption(3);
              setModalMenu(false);
              //navegacion.navigate('Reporte');
              navegacion.navigate("Mas")
            }}
            style={styles.opciones}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              source={require("../../assets/png/reportetarjeta.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCredenciales({});
              setState(false)
              setModalMenu(false);
              navegacion.navigate("Login");
            }}
            style={styles.opciones}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              source={require("../../assets/png/cerrarsession.png")}
            />
          </TouchableOpacity>
        </View>
     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  opciones: {
    width: "100%",
    height: 48,
  },
  container: {
    backgroundColor: "rgba(21,37,89,.5)",
    width: "100%",
    height: "94%",
    zIndex: 10,
    position: "absolute",
    top: 0,
    left: 0,
  },
  menu: {
    width: 190,
    height: 187,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 7,
    right: 35,
  },
});
export default MenuModal;

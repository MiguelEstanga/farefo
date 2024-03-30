import { View, Text, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';


import { TarjetaContext } from '../../context/Tarjeta';
export default function Profile() {


  const {tarjeta} = useContext(TarjetaContext)
  
  return (
    <>
      <View style={styles.container}  >
        <Text
          style={styles.title}>
          Nombre
        </Text>
        <Text
          style={styles.name}  
        >
          {tarjeta?.Nombre} {tarjeta?.ApellidoPaterno} {tarjeta?.ApellidoMaterno}
        </Text>
      </View>
      <View style={styles.container2}  >
        <Text
          style={styles.title}>
          Dirección de la empresa
        </Text>
        <Text
          style={styles.name}
        >
          {tarjeta?.DireccionEmpresa ?? 'no disponible '}
        </Text>
      </View>
      <View style={styles.container}  >
        <Text
          style={styles.title}>
          Teléfono
        </Text>
        <Text
          style={styles.name}
        >
          {tarjeta?.Telefono ?? 'no disponible '}
        </Text>
      </View>
      <View style={styles.container2}  >
        <Text
          style={styles.title}>
          Correo Electrónico
        </Text>
        <Text
          style={styles.name}
        >
          {tarjeta?.Correo ?? 'no disponible '}
        </Text>
      </View>
      <View style={styles.container}  >
        <Text
          style={styles.title}>
          Producto
        </Text>
        <Text
          style={styles.name}
        >
          {tarjeta?.NombreProducto}
        </Text>
      </View>
     
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 'auto',
    flexDirection: "row",

    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 8,
    paddingRight: 20,

  },
  container2: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 8,
    paddingRight: 20,
    backgroundColor: "#E5E7ED",
    width: "100%",
    height: 'auto',
    flexDirection: "row",
    alignItems: "center",


  },
  title: {
    fontSize: 16,
    color: "#152559",
    textAlign: "left",

    width: "50%",
    height: "100%",
    fontWeight: "600"
  },
  name: {
    fontSize: 16,
    color: "#444444",
    textAlign: "left",
    width: "50%",
    height: "100%",


  },
});
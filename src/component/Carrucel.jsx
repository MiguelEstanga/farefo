import React, { Component } from "react";
import { Image, StyleSheet,  View } from "react-native";
import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        buttonWrapperStyle={{left: 1, right: 1}} // Personaliza la posición de los botones
        nextButton={<Image source={require('../../assets/png/derecha.png')} />} // Personaliza el botón siguiente
        prevButton={<Image source={require('../../assets/png/izquierda.png')} />} // Personaliza el botón anterior
      >
        <View style={styles.slide1}>
          <Image
            style={{
              resizeMode: "cover",
              width: "95%",
              height: "95%",
            }}
            source={require("../../assets/png/collage3.png")}
          />
        </View>
        
    
      </Swiper>
    );
  }
}

import { View,  StyleSheet, Animated, Easing } from "react-native";
import React, { useRef, useEffect } from "react";

export default function Loaded() {
    const scaleValueImage = useRef(new Animated.Value(0)).current;
    const scaleValueText = useRef(new Animated.Value(0)).current;

    const startAnimationImage = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValueImage, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValueImage, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    const startAnimationText = () => {
        Animated.timing(scaleValueText, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        startAnimationImage();
        startAnimationText();
    }, []);

    return (
        <View style={style.container} >
            <View style={style.contenido} >
                <Animated.Image
                    source={require('../../assets/png/loaded.png')}
                    style={{
                        width: 100,
                        height: 100,
                        transform: [{ scale: scaleValueImage }],
                    }}
                />
                <Animated.Text style={
                    {
                        marginTop: 20,
                        fontSize: 18,
                        transform: [{ scale: scaleValueText }],
                        color:"#FFFFFF"
                    }
                } >
                    Espere un momento ...
                </Animated.Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",

        backgroundColor: "rgba(  21, 37, 89 ,.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },

    contenido: {

        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    tex: {
        marginTop: 20,
        fontSize: 18,
    }
});

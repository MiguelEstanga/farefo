import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
export default function HeaderRegresar({
    color="#000",   
    titulo="titulo",
    flechaColor="#000",
    image = false,
    flecha = true,
    coloHeader = "#FFF"
}) {
   const navegacion  =  useNavigation()
  return (
    <View style={
        {
            backgroundColor:coloHeader,
            position:'relative',
            height:50,
            marginTop:20,
            width:'100%',
            flexDirection:'row',
        }
    }>
        {
            flecha == true ? (
                <TouchableOpacity
                    onPress={ () => navegacion.goBack()}
                    style={{
                    
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'15%',
                        height:'100%',
                        position:'absolute',
                        zIndex:10,
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color={flechaColor} />
                </TouchableOpacity>
            ):""
        }
       
        {
            image == true ? (
                <View
                    style={{
                        
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <Image
                        source={require("../../assets/png/Logo.png")}
                    />
                </View>
            ) : (
                <Text
                    style={ 
                        {
                        
                            fontSize:20,
                            color:color,
                            fontSize:18,
                            width:"100%",
                            textAlign:'center',
                            textAlignVertical:'center',
                            fontWeight:"600"
                        }
                    }
                >
                    {titulo}
                </Text>
            ) 
        }
        
    </View>
  );
}

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import InputText from './InputText';
import Btn from './Btn';


export default function ConfimacionPasswordLayout(
    {
        titulo,
        setPassword,
        password,
        confirmacion
    }
) {
  
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.titulo}>
                {titulo}
            </Text>
            <View style={styles.formulario} >
                <InputText
                    value={password}
                    label='Contraseña'
                    password={true}
                    placeholder='Contraseña'
                    placeholderTextColor='#444444'
                    eventoText={setPassword}
                    style={{ marginTop: 10 }}
                />
            </View>
            <View 
                style={{
                  
                    marginTop:50,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <Btn
                    texto={'Confirmar'}
                    color='#152559'
                    evento={() => confirmacion()}
                    width={208}
                    height={40}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        width: "100%",
        height: "100%",
    },
    formulario: {
        width: "100%",
        height: "300px",
        borderColor: '#444444',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo:{
        fontSize: 14,
        color: '#444444',
        width: "100%",
        padding: 10,
       
    }
})
import { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
function InputText({
  label,
  setText,
  subtitulo = false,
  textSubtitulo,
  placeholder,
  password = false,
  initPassword = true,
  eventoText,
  number = false,
  longitud = 100
}) {
  const [visible , setVisible] = useState(initPassword)
  const [values , setValue] = useState('')
  

  useEffect(()=> {} , [visible])
  const handle_visible =( ) => {
    setVisible(!visible)
  
  }
  return (
    <View
      style={{
        width: 300,
        height: 40,
      }}
    >
      <Text
        style={{
          color: "#152559",
          fontSize: 16,
          fontWeight: "600",
          marginBottom:10
        }}
      >
        {label}
      </Text>
      {subtitulo == true ? (
        <Text
          style={{
            color: "#152559",
            fontSize: 12,
            fontWeight: "400",
            marginBottom: 5,
          }}
        >
          {textSubtitulo}
        </Text>
      ) : (
        ""
      )}
      <TouchableOpacity style={{}}>
        {password == true ? (
          <TouchableOpacity
            onPress={() => handle_visible()}
            style={{
              position: "absolute",
              right: 10,
               
                zIndex:1,
              height: "100%",
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {
              visible === false ? (<Ionicons name="eye-off" size={24} color="black" />
              ) : ( <Image source={ require("../../assets/png/ojito.png") } />)  

            } 
          </TouchableOpacity>
        ) : (
          ""
        )}

        <TextInput
          placeholder={placeholder}
          onChange={(event) => eventoText(event.nativeEvent.text) }
          secureTextEntry={visible}
          maxLength={longitud}
          keyboardType={ number === false ? "default": "numeric" }// Set keyboardType to "numeric"
          style={{
            borderWidth: 1,
            height: "70%",
            height: 30,
            color: "#152559",
            borderRadius: 4,
            paddingLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default InputText;

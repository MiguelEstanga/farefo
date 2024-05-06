import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Titulo from "../../component/Titulo";
import { useState, useContext, useEffect } from "react";
import ModalCodigo from "../../component/ModalCodigo";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { RegistroContext } from "../../context/Registrar";

import axios from "axios";
import { ModalAlert } from "../../component/Modal";

  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import Loaded from "../../component/Loaded";
  
function Registro() {
  const navegacion = useNavigation();
  const [seconds, setSeconds] = useState(300);
  const [ok, setOk] = useState(true);
  const [token, setToken] = useState(false);
  const { telefonoC, code , setCode} = useContext(RegistroContext);
  const [text , setText] = useState('')
  const [value, setValue] = useState('');
  const [loaded , setLoaded] = useState(false)
  const [modal , setModal] = useState(false)
  const [error , setError] = useState(false)
  const [plazo , setPlazo] = useState(false)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handle_navegacion = () => {
    navegacion.navigate("DatosUsuario");
    setSeconds(0)
   
  };
const reenviar = ()=>{
  
  setLoaded(true)
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/EnviarSMSOnbV2",
        {
            "Telefono":telefonoC
        },
        {
          headers,
        }
      )
      .then((res) => {
       
       
        setSeconds(300)
        if(res.data.CodigoRespuesta === "0"){
         
          setCode(res.data.Token)
         
        }else{
          
          setModal(true);
          setText("Codigo invalido ")
        }
      })
      .catch(error =>{
        setError(true)
        setText("error en el servidor ("+error+ ")")
      })
      .finally(res => {
        setLoaded(false)
        setOk(true)
        
      })
  
}
const registro = () => {
    if(value.length != 0){

    
    const headers = {
      "Content-Type": "application/json",
      
    };
    axios
      .post(
        "https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/ValidarSMSOnbV2",
        {
          "Telefono":telefonoC,
          "TokenSMS":value
        },
        {
          headers,
        }
      )
      .then((res) => {
         if(seconds === 0 ){
            setModal(true)
            setText("Código vencido")
         }else{
            if (res.data.CodigoRespuesta === '0') {
              console.log("codigo no vencido")
              navegacion.navigate("DatosUsuario");             
            } else {
              setModal(true);
              setText(" Código inválido ")
            }
         }
       
      })
      .finally((res) => {
        //navegacion.navigate("Registro");
      });
    }else{
        setText(" Código inválido")
        setToken(true)
    }
  };

  const codigomsms = ()=>{
     setValue(code)
  }
  
  const CELL_COUNT = 6;
  useEffect (  () =>{
        
  } ,[code , loaded ,ok] )

  useEffect(() => {
    
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds ]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if(seconds < 10 )
    {
      return `${minutes}:0${seconds} `;
    }else{
      return `${minutes}:${seconds} `;
    }
   
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      {
        loaded == true  ? (<Loaded/>) : ''
      }
      {
        error == true ? (<ModalAlert
          mensage={text}
          modal={error}
          setmodal={setError}
        />):""
      }
      <ModalAlert
        modal={modal}
        setmodal={setModal}
        mensage={text}
      />
      <View>
        <Titulo titulo={"Escribe tu código"} />
      </View>
      <View style={style.containerLeyenda}>
        <Text>
          Captura del código de verificación enviado vía SMS al teléfono
          registrado, el mensaje puede tardar un minuto en llegar:
        </Text>
      </View>
      <View style={{ paddingLeft: 30, marginTop: 10 }}>
        <Text style={{ color: "#152559", fontSize: 16 }}>
          Enviado al teléfono:
        </Text>
      </View>
      <View style={style.code}>
        <Text style={{ fontSize: 30 }}> {telefonoC}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
     
     <Text style={{ color: "#152559", fontSize: 16 ,height:40, }}>
     <Image source={require("../../../assets/png/tiempo.png")} />
     {" "}
       Tú código vence en:
     </Text>
     <Text style={{ fontSize: 16 }}>
       <Text style={{ color: "#D1103A", fontSize: 16, marginTop: 10 }}>
         {formatTime(seconds)}
       </Text>
       minutos
     </Text>
   </View>
      <View>
        <View style={style.containerInput}>
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
        
        </View>
        
         {
          ok == true ? (
            <ModalCodigo token={code} evneto={codigomsms} estado={ok} setStado={setOk} />

          ):""
         }

      
        

      </View>
      <View style={style.reenviar}>
        <Text style={{ fontSize: 14, fontWeight: "900", marginBottom: 10 , marginTop:15 }}>
          ¿No te llegó el SMS?
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "300", width: 310 }}>
          Si el teléfono no es el correcto, regresa y corrige tu número. Si el
          teléfono es correcto vuelve a enviar tu código:
        </Text>
        <Text
          onPress={() => reenviar() }
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: "400",
            color: "#636E90",
            borderBottomWidth: 1,
            width: 140,
            borderColor: "#636E90",
          }}
        >
          Enviar nuevo mensaje
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          justifyContentL: "center",
          alignItems: "center",
        }}
      >
        <Btn
          color={"#152559"}
          texto={"Verificando"}
          evento={registro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 48,
    height: 84,
    lineHeight: 38,
    fontSize: 24,
    borderRadius:4,
    fontWeight:"600",
    borderWidth: 2,
    borderColor: '#757474',
    textAlign: 'center',
    textAlignVertical:"center",
    marginLeft:5,
    color:'#000000'
  },
  focusCell: {
    borderColor: '#000',
  },
});

const style = StyleSheet.create({
  reenviar: {
    paddingLeft: 30,
  },
  containerLeyenda: {
    paddingLeft: 30,
    marginTop: 10,
    lineHeight: 30,
    color: "#444444",
    fontSize: 16,
    fontWeight: "300",
  },
  code: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F3D6B",
    padding: 10,
    margin: 3,
    width: 49,
    height: 84,
    textAlign: "center",
    borderRadius: 4,
    backgroundColor: "rgba(47, 61, 107, .2)",
  },
});
export default Registro;

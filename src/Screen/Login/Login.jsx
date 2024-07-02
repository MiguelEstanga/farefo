import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  NativeModules, Platform 
} from "react-native";
import InputText from "../../component/InputText";
import * as Expo from 'expo';
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Login";
import Loaded from "../../component/Loaded";
import { ModalAlert } from "../../component/Modal";
import { TarjetaContext } from "../../context/Tarjeta";
import { URL, endpoint } from "../../Helpers/Api";
import { AES, TripleDES, lib, mode, CipherOption, Cipher } from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';
import { StatusContext } from "../../context/StatusContex";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from 'react-native';
import  {getTarjeta, httpLogin} from '../../api/Peticiones';
function Login() {

  const navegacion = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cth, setCth] = useState(false);
  const {setCredenciales , credenciales , setTimeStart , setTimeEnd  , setLogin} = useContext(LoginContext);
  const {setTarjeta } = useContext(TarjetaContext);
  const [loaded, setLoaded] = useState(false);
  const [textError, setTextError] = useState("");
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [time , setTime] = useState({})
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [image, setImage] = useState(null);
  useEffect(() => {
    
    const key = CryptoJS.enc.Utf8.parse('3rd6sl2u325b13f8ioh6tn11');
    const iv = CryptoJS.enc.Utf8.parse('86878555');

    const ciphertext = "pX9FukCaDDF5eYngYJNaXA==";
    
    const decrypted = TripleDES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  
     
  }, [error, loaded]);
  /** 
  const captureAndShareScreenshot = async () => {
    console.log('cap')
    const result = await Expo.ScreenCapture.captureAsync();
    if (result) {
      const imageUri = await Expo.FileSystem.saveImageAsync(result, 'screenshot.png');
      setImage(imageUri);
      const shareResult = await Expo.Share.shareAsync({
        title: 'Captura de pantalla',
        uri: imageUri,
      });
      if (shareResult.action === 'shared') {
        console.log('¡Captura de pantalla compartida!');
      }
    }
  };
  */
  

  useEffect(() => {
    
    setTimeout(() => {
      
      setVisible(false);
    }, 5000); // Retardo de 3 segundos
  }, []);

  const tarjetaInfo = (usuario) => {
    const headers = {
      "Content-Type": "application/json",
      Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
    };

    axios
      .post(
        `${URL.UrlBase}${endpoint.OBTENER_DATOS_DE_LA_TAJETA}`,
        {
          IDSolicitud: "",
          telefono: usuario.trim(),
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log('tarjeta res')
        console.log(res.data);
       
        if( res?.data.CodRespuesta === "9999"){
          setModal(true);
          console.log(res?.data)
          setTextError(
              res?.data.DescRespuesta
          );
        }
         
        if( res.data.CodRespuesta === "0000"){
          setTarjeta({ ...res.data });
          navegacion.navigate("HOMES");
        }
       
      })
      .catch((exection) => {
        setError(exection);
      
      });
  };

  const HandleLogin = async () => {
     let loginStatus = await httpLogin({
        usuario:usuario.trim(),
        password:password.trim(),
        setLoaded:setLoaded,
        setAlert:setModal,
        setError:setTextError
      })
      console.log(loginStatus)
      
      if(loginStatus.status === true){
          setLogin(true)
          setCredenciales({ ...loginStatus.data, password: password.trim() });
          tarjetaInfo(usuario.trim());
         // navegacion.navigate("HOMES");
      }
     
  }

 


  if(visible)
  {
      return (<View
        style={{
            position:"absolute",
            width:"100%",
            height:"100%",
          
            zIndex:10,
            bottom:0
            
        }}
      >
        <Image
          style={{
            width:"100%",
            height:"100%",
          
          }}
          source={require('../../../assets/splah.png')}
        />
      </View>)
  }
  return (

      <SafeAreaView>
       
          <View
            style={{
              width:"100%",
              height:"100%",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
           
                <Image
                  style={{
                    position:"absolute",
                    top:0,
                 
                    borderWidth:1,
                    width:screenWidth,
                    height:screenHeight,
                  }}
                  source={require("../../../assets/png/marcos.png")}
                />
           
            
          
            {loaded == true ? <Loaded /> : ""}

            <ModalAlert modal={modal} setmodal={setModal} mensage={textError} />

            {cth == true ? ( <ModalAlert modal={cth} setmodal={setCth} mensage={textError} />) : ("")}

        
            

          
           
              <View
              
              >
                <View style={style.contenformulario}>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={style.logo}>
                      <Image
                        style={{
                          width: 300,
                          height: "100%",
                          resizeMode: "stretch",
                        }}
                        source={require("../../../assets/png/login_farefo.png")}
                      />
                    </View>
                  </View>

                  <View style={style.formulario}>
                    <InputText
                      label={"Teléfono"}
                      subtitulo={true}
                      value={usuario}
                      textSubtitulo={
                        "Captura el teléfono con el que se dio de alta tu cuenta "
                      }
                      placeholder={""} 
                      password={false}
                      initPassword={false}
                      eventoText={setUsuario}
                      longitud={10}
                      number={true}
                    />

                    <View style={{ marginTop: 50 }}>
                      <InputText
                        label={"Contraseña"}
                        subtitulo={false}
                        value={password}
                        password={true}
                        initPassword={true}
                        eventoText={setPassword}
                      />
                    </View>
                    <View style={style.fogotpassword}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: 10,
                        
                        }}
                      >
                        <View>
                          <Image
                            source={require("../../../assets/png/candadito.png")}
                          />
                        </View>
                        <Text
                          onPress={() => navegacion.navigate("TabPassword")}
                          style={{ borderBottomWidth: 1 }}
                        >
                          Olvidé mi contraseña 
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "95", height: 40, margin: 30 }}>
                      <Btn
                        texto={"Entrar"}
                        color={"#152559"}
                        evento={() => HandleLogin()}
                      />
                    </View>
                    <View style={style.registro}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Image
                            source={require("../../../assets/png/usuario.png")}
                          />
                        </View>
                        
                        <Text
                          onPress={() => {
                            navegacion.navigate("TabRegistro");
                          }}
                          style={{
                            borderColor: "#D1103A",
                            borderBottomWidth: 1,
                            color: "#D1103A",
                            fontSize: 16,
                          }}
                        >
                          Registrarme
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>


                               
          </View>
              
      </SafeAreaView>                    
  );
}

const style = StyleSheet.create({
  registro: {
    marginTop: 30,
  },
  fogotpassword: {
    width: 320,
    marginTop: 30,
  },
  container: {
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    
   
  },

  contenformulario: {
    height: 500,
    width: "95%",
    justifyContent: "center",
    alignItems:"center"
  },
  logo: {
    width: 300,
    height: 65,
  
  },
  formulario: {
    marginTop: 20,
    height: 300,
    alignItems: "center",
  },
});
export default Login;

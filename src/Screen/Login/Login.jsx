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


function Login() {
  const navegacion = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cth, setCth] = useState(false);
  const {setCredenciales } = useContext(LoginContext);
  const {setTarjeta } = useContext(TarjetaContext);
  const [loaded, setLoaded] = useState(false);
  const [textError, setTextError] = useState("");
  const [modal, setModal] = useState(false);
 


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
        setTarjeta({ ...res.data });
        
        navegacion.navigate("HOMES");
      })
      .catch((exection) => {
        setError(exection);
        console.log(exection);
      });
  };
  const login = async () => {
    if (usuario.length < 10) {
      setModal(true);
      setTextError(
        "EL número telefónico debe contener  10 dígitos."
      );
      return 0;
    }

    if (password.length > 0 && usuario.length > 0) {
      setLoaded(true);
      const headers = {
        "Content-Type": "application/json",
        Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };
      try {
        const respuesta = await axios.post(
          `${URL.UrlBase}${endpoint.LOGIN}`,
          {
            NombreUsuario: usuario.trim(),
            Password: password.trim(),
          },
          {
            headers,
          }
        );

        console.log(respuesta.data);
        if (respuesta.data.CodRespuesta === "0000") {
          setCredenciales({ ...respuesta.data, password: password.trim() });

          //aqui cahceo datos de la tarjeta
          tarjetaInfo(usuario);
          ///navegacion.navigate("HOMES");
        } else {
          setModal(true);
          setTextError(
            'Favor de revisar la información. Si es la primera vez que utilizas tu aplicación, regístrate desde el botón "Registrarme" '
          );
        }
      } catch (error) {
        setCth(true);
        setTextError(
          "error del servidor al momento de obtener datos hacer login (" +
            error +
            ")"
        );
      } finally {
        setLoaded(false);
      }
    } else {
      setTextError("Los campos no pueden estar vacíos");
      setModal(true);
    }
  };

  return (
    <ScrollView>
      {loaded == true ? <Loaded /> : ""}

      <ModalAlert modal={modal} setmodal={setModal} mensage={textError} />

      {cth == true ? (
        <ModalAlert modal={cth} setmodal={setCth} mensage={textError} />
      ) : (
        ""
      )}

      <View style={style.container}>
        
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderWidth:11,
              position:"absolute",
              bottom:0
            }}
            source={require("../../../assets/png/marcos.png")}
          />
       
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,

              height: 800,
              justifyContent: "center",
              alignItems: "center",
            }}
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
                      width: "100%",
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
                    evento={() => login()}
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
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  registro: {
    marginTop: 30,
  },
  fogotpassword: {
    width: "92%",
    marginTop: 30,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  contenformulario: {
    height: 500,
    width: "95%",
    justifyContent: "center",
  },
  logo: {
    width: "87%",
    height: 73,
  },
  formulario: {
    marginTop: 20,
    height: 300,
    alignItems: "center",
  },
});
export default Login;

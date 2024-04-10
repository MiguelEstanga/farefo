import { Text, View } from "react-native";
import { useState } from "react";
import { AES, TripleDES, lib, mode, CipherOption, Cipher } from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';
import Btn from "../../component/Btn";
import { useNavigation} from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { NipContext } from "../../context/NIP";

function NIP() {
  const navgacion = useNavigation();
  const {nip} = useContext(NipContext)
  const [nipParse , setNipParse] = useState("")

  const handel_cerrar = () => {
    navgacion.navigate("CreditoTab");
  };


  useEffect(()=>{
    const key = CryptoJS.enc.Utf8.parse('3rd6sl2u325b13f8ioh6tn11');
    const iv = CryptoJS.enc.Utf8.parse('86878555');

    const ciphertext = nip.NIP ?? "vRevkx0WFYQc2X5NnuMaWQ==";// en caso de venir el nip pone esta cadena por default
    
    const decrypted = TripleDES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    setNipParse(plaintext)
    console.log('NIP desencriptado:', plaintext);
    console.log(ciphertext)
     
      
    console.log(nip)
  },[nip])
  return (
    <View>
      {nip.NIP ? (
          <Text style={{ fontSize: 117, color: "#152559", textAlign: "center" }}>
            {nipParse}
        </Text>
      ):(
        <Text style={{
          textAlign:"center",
          marginTop:30,
          marginBottom:30,
          fontSize:20
        }} >
          {nipParse}
          {nip.DescRespuesta ?? ""}
        </Text>
      )
      }
      
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Btn
          texto={"Cerrar"}
          color={"#D1103A"}
          evento={() => navgacion.navigate("Informacion") }
        />
      </View>
    </View>
  );
}

export default NIP;

import { StyleSheet, TouchableOpacity, View , Text} from "react-native";
import Titulo from "../../../component/Titulo";
import CreditoInfo from "../../../component/CreditoInfo";
import InputText from "../../../component/InputText";
import Btn from "../../../component/Btn";
import { useContext, useEffect, useState } from "react";
import { TranferenciaContext } from "../../../context/Tranferencia";
import { useNavigation } from "@react-navigation/native";
import { ModalAlert } from "../../../component/Modal";
import agregarComas from "../../../Helpers/agregarComas";
function Monto() {
  const navegacion = useNavigation();
  const { setTranferencia , tranferencia , avanzar} = useContext(TranferenciaContext);
  const [alert , setAlert] = useState(false);
  
  useEffect(() => {
    console.log('avanzar' , tranferencia.monto.length )

  } ,[tranferencia , avanzar])

  function onPressAvanzar() {
    if( tranferencia?.monto && tranferencia?.concepto && tranferencia?.referencia) {
      navegacion.navigate("Confirmacion");
    }else{
      setAlert(true);
    }
    
  }
  return (
    <View
      style={{
        backgroundColor:"#fff",
        height:"100%",
      }}
    >
      <ModalAlert
        modal={alert}
        setmodal={setAlert}
        mensage={'Rellene los campos'}
      />
      <View>
        <Titulo titulo={"¿Cuánto deseas transferir?"}  colorFondo="#00000012" />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" , marginBottom:10 }}>
        <CreditoInfo
            texCredito="Crédito actual"
            textDisponible="Después de trasferenncia"
            esMonto={true}
        />
      </View>
      <View style={{ alignItems: "center"  }}>
        <View style={style.input}>
          <InputText 
            value={ agregarComas(tranferencia.monto) ?? ""}
            label={"Monto"} 
            number={true}
            eventoText={(Monto) =>  setTranferencia({...tranferencia , monto:Monto})}
            initPassword={false}
            password={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
            value={tranferencia.concepto ?? ""}
            label={"Concepto"} 
            eventoText={(conceptop) =>  setTranferencia({...tranferencia , concepto:conceptop})}
            initPassword={false}
            password={false}
          />
        </View>
        <View style={style.input}>
          <InputText 
             value={tranferencia.referencia ?? ""}
            label={"Referencia"} 
             number={true}
             subtitulo={true}
            colorSubtitulo="#444444"
             textSubtitulo={'Escribe una referencia de personal. Máximo 7 caracteres'}
             longitud={7}
            eventoText={(referencia) => setTranferencia({...tranferencia , referencia:referencia})}
            initPassword={false}
            password={false}
          />
        </View>
      </View>
      <View style={
        {
        width:'90%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:1,
        padding:10,
        width:'100%',
        alignItems:'center',
        marginTop:40,
        marginBottom:30,
        }
      }>
             <Btn
                color={'#D1103A'}
                texto={"Regresar"}
                evento={ () => navegacion.goBack()}
                width={'50%'}
                height={32}
             />
            <Btn
                evento={ () =>  onPressAvanzar() }
                color={"#152559" }
                texto={"Confirmar"}
                disabled={ avanzar }     
                width={"50%"}

                height={32}
            />
           
            
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    height: 80,
  },
});
export default Monto;

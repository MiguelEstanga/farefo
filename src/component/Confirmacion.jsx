import { View, Text, Modal } from "react-native";

import InputText from "./InputText";
import Btn from "./Btn";

import { useNavigation } from "@react-navigation/native";

function Confirmacion({
    modal , 
    setModal,
    leyenda,
    navegar
}) {
    const navegacion  = useNavigation()
    const handle_modal_close = ()=>{
        setModal(!modal)
        navegacion.navigate(navegar)
    }
  return (
    <Modal
      visible={modal}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
   
      <View>

        <View
            style={{
                width:"100%",
                padding:10,
                justifyContent:"center",
                alignItems:"center"
            }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "300",
              color: "#444444",
              textAlign:"justify",
             
              width:'90%'  
            }}
          >
            {leyenda}
          </Text>
        </View>
        <View
            style={
                {
                    width:"100%",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:10
                }
            }
        >
           <InputText
            label={'Contraseña'}
            
           />
        </View>
        <View
            style={{
                
                alignItems:"center",
                marginTop:70
            }}
        >
            <Btn
                evento={handle_modal_close}
                color={'#152559'}
                texto={"Continuar"}
            />
        </View>
      </View>
    </Modal>
  );
}

export default Confirmacion;

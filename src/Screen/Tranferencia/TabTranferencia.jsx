import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tranferir from "./Tranferir/Tranferir";
import Monto from "./Monto/Monto";
import Header from "../../component/Header";
import Confirmacion from "./confitmacion/Confirmacion";
import ConfirmacionPasword from "./ConfirmacionPasword";
import Sucess from "./success/Sucess";
import Detalles from "./Detalles/Detalles";

const Tab = createNativeStackNavigator();
function TabTranferencia() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Tranferencia" component={Tranferir} 
        options={{
          headerTitle: () => <Header/>,
          headerTitleAlign:"center"
        }}
      />

      <Tab.Screen name="Monto" component={Monto} 
      options={{
        headerTitleAlign:"center",
        title:"Transferencia",
        headerTintColor:"#152559"
      }}/>

      <Tab.Screen name="Confirmacion" 
        component={Confirmacion} 
        options={{
         headerShown: false,
        }}
      />

      <Tab.Screen name="Confirmacion_tranferencia" component={ConfirmacionPasword} options={{
          headerShown: false,
      }}/>
    
    <Tab.Screen name="tranferenciaSuccess" component={Sucess} options={{
          headerShown: false,
      }}/>

    <Tab.Screen name="detalles" 
        component={Detalles} 
        options={{
          headerShown: false,
        }}
      />
     
    </Tab.Navigator>
  );
}

export default TabTranferencia;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tranferir from "./Tranferir/Tranferir";
import Monto from "./Monto/Monto";
import Header from "../../component/Header";

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

      <Tab.Screen name="Monto" component={Monto} options={{
        headerTitleAlign:"center",
        title:"Tranferencia",
        headerTintColor:"#D62B50"
      }}/>
    </Tab.Navigator>
  );
}

export default TabTranferencia;

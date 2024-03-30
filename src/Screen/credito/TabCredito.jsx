import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Credito from "./Credito";
import Activar from "../ActivarTarjeta/Activar";
import Header from "../../component/Header";
import { Text } from "react-native";
import HeaderBackTitle from "../../component/HeaderBackTitle";
import Informacion from "../InformacionDeLaTarjeta/Informacion";
import NIP from "../NIP/NIP";
import Movimientos from "../movimientos/Movimientos";

const TabCredito = createNativeStackNavigator()
function CreditoTabNavigation() {
    
    return ( 
        <TabCredito.Navigator>
            <TabCredito.Screen
                name="Credito"
                component={Credito}
                options={{
                    headerTitle: () => <Header />,
                    headerTitleAlign:"center"
                }}
            />

            <TabCredito.Screen
                name="Activar"
                component={Activar}
                options={
                    {
                        headerTitle:()=>(<HeaderBackTitle  titulo={'Activar tarjeta'} />),
                        headerTintColor:"#D62B50",
                        headerStyle:{
                            color:"#152559"
                        }
                    }
                }
            />
            <TabCredito.Screen
                name="Informacion"
                component={Informacion}
                options={{
                    headerTitleAlign:"center",
                    headerTitle:()=>(<Header/>),

                }}
            />
             <TabCredito.Screen
                name="NIP"
                component={NIP}
                options={{
                    title:"Consulta de NIP",
                    headerTitleAlign:"center",
                    headerTintColor:"#D1103A",
                    headerTitleStyle:{
                        color:"#152559"
                    }
                }}
            />

            <TabCredito.Screen
                name="Movimientos"
                component={Movimientos}
            />
        </TabCredito.Navigator>
     );
}

export default CreditoTabNavigation;
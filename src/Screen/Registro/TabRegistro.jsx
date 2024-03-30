import { createStackNavigator } from "@react-navigation/stack";
import Registro from "./Registro";
import DatosUsuario from "./DatosUsuario";
import CrearPassword from "./CrearPassword";
import Telefono from "./Telefono";

import RegistroExitoso from "./RegistroExitoso";

const Tab = createStackNavigator()
function TabRegistro() {
    return ( <Tab.Navigator>
        <Tab.Screen
            name="Telefono"
            component={Telefono}
            options={{
                headerTintColor:"#D1103A",
                headerTitleAlign:"center",
                headerTitleStyle:{color:"#152559"},
                title:"Registro de usuario"
            }}
        />
        <Tab.Screen
            name="Registro"
            component={Registro}
            options={{
                headerTintColor:"#D1103A",
                headerTitleAlign:"center",
                headerTitleStyle:{color:"#152559"},
                title:"Registro de usuario"
            }}
        />

        <Tab.Screen
            name="DatosUsuario"
            component={DatosUsuario}
            options={{
                headerTintColor:"#D1103A",
                headerTitleAlign:"center",
                headerTitleStyle:{color:"#152559"},
                title:"Registro de usuario"
            }}
        />
        <Tab.Screen
            name="Password"
            component={CrearPassword}
            options={{
                headerTintColor:"#D1103A",
                headerTitleAlign:"center",
                headerTitleStyle:{color:"#152559"},
                title:"Registro de usuario"
            }}
        />

        <Tab.Screen
            name="registroexitoso"
            component={RegistroExitoso}
            options={{
                headerShown:false,
                
            }}
        />
    </Tab.Navigator> );
}

export default TabRegistro;
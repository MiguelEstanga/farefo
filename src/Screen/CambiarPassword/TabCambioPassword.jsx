import { createStackNavigator } from "@react-navigation/stack";
import PasswordChange from "./PasswordChange";
import Code from "./Code";
import NewPassword from "./NewPassword";
import CambioExitoso from "./CambioExitozo";

const Tab = createStackNavigator();
function TabCambioPassword() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ChangePassword"
        component={PasswordChange}
        options={{
          headerTintColor:"#D1103A",
          headerTitleAlign:"center",
          headerTitleStyle:{color:"#152559"},
          title:"Recuperación de contraseña"
      }}
      />

      <Tab.Screen
        name="CodeChangePassword"
        component={Code}
        options={{
          headerTintColor:"#D1103A",
          headerTitleAlign:"center",
          headerTitleStyle:{color:"#152559"},
          title:"Recuperación de contraseña"
      }}
      />

      <Tab.Screen
            name="NuevaPassword"
            component={NewPassword}
            options={{
              headerTintColor:"#D1103A",
              headerTitleAlign:"center",
              headerTitleStyle:{color:"#152559"},
              title:"Recuperación de contraseña"
          }}
      />
      <Tab.Screen
        name="CambioExitozo"
        component={CambioExitoso}
        options={{
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
}

export default TabCambioPassword;

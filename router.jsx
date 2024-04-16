import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/Screen/home/Home";
import Header from "./src/component/Header";
import CreditoTabNavigation from "./src/Screen/credito/TabCredito";
import TabTranferencia from "./src/Screen/Tranferencia/TabTranferencia";
import MasOpciones from "./src/Screen/MasOpciones/Masopciones";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SubmenuContext } from "./src/context/SubMenuContex";
import Login from "./src/Screen/Login/Login";
import TabRegistro from "./src/Screen/Registro/TabRegistro";
import TabCambioPassword from "./src/Screen/CambiarPassword/TabCambioPassword";
const TabNavegacion = createBottomTabNavigator();
const Stak = createStackNavigator();
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ConfirmacionNip from "./src/Screen/NIP/ConfimacionNip";
import ConfirmarCvv from "./src/Screen/CVV/ConfirmarCvv";
import ActivacionExitosa from "./src/Screen/ActivarTarjeta/ActivisacionExitosa";
import ConfimacionActivacion from "./src/Screen/ActivarTarjeta/ConfimacionActivacion";
import { Preguntas } from "./src/Screen/MasOpciones/Preguntas";
import { Reporte } from "./src/Screen/MasOpciones/Reporte";
import Profile from "./src/Screen/MasOpciones/Profile";
import { useNavigation } from "@react-navigation/native";
import { MasContext } from "./src/context/Mas";
import HeaderTitulo from "./src/component/HeaderTitulo";


export default function Route() {
  const { setModalMenu, modal } = useContext(SubmenuContext);
  const {option} = useContext(MasContext)
  const navegacion = useNavigation()
  const modal_menu_active = ()=>{
      if(modal === true)
      {
        setModalMenu(false)
      }
  }
  useEffect(() => {console.log(option)} , [option])
  return (
    <TabNavegacion.Navigator>
      <TabNavegacion.Screen
        name="inicio"
        component={Home}
        listeners={{
          tabPress: () => {
            modal_menu_active()
          },
        }}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={24} color="#152559" />
          ),
          headerTitleAlign: "center",
          title: "INICIO",
        }}
      />

      <TabNavegacion.Screen
        name="CreditoTab"
        component={CreditoTabNavigation}
        listeners={{
          tabPress: () => {
            modal_menu_active()
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="creditcard" size={24} color="#152559" />
          ),
          headerTitleAlign: "center",

          title: "CRÉDITO",
        }}
      />

      <TabNavegacion.Screen
        name="TabTraferencia"
        component={TabTranferencia}
        listeners={{
          tabPress: () => {
            modal_menu_active()
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
                style={{height:24 , width:24 }}
                source={require('./assets/png/flechasmennu.png')}
            />
          ),
          title: "TRANFERENCIA",
        }}
      />

      <TabNavegacion.Screen
        name="Mas"
        component={option === 1 ? (Profile) : option === 2 ? (Preguntas): (Reporte) }
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
           
            setModalMenu(!modal);
            
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square-o" size={24} color="black" />
          ),
          headerTitle: () => <HeaderTitulo  titulo={option === 1 ? "Perfil" : option === 2 ? "Preguntas Frecuentes": "Reporte por Robo o extravío"} />,
         
          headerTitleAlign:"center",
          headerTintColor:"#152559",
        }}
      />
    </TabNavegacion.Navigator>
  );
}

function NavegacionRourter() {
  return (
    <Stak.Navigator>
      <Stak.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      
      <Stak.Screen
        name="HOMES"
        component={Route}
        options={{
          headerShown: false,
        }}
      />


      <Stak.Screen
        name="TabPassword"
        component={TabCambioPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stak.Screen
        name="TabRegistro"
        component={TabRegistro}
        options={{
          headerShown: false,
        }}
      />

      <Stak.Screen
        name="ConfirmacionNip"
        component={ConfirmacionNip}
        options={{
          title: "Consulta de NIP",
          headerTitleAlign: "center",
        }}
      />

      <Stak.Screen
        name="ConfirmacionCVV"
        component={ConfirmarCvv}
        options={{
          title: "Consulta de CVV",
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },
        }}
      />
      <Stak.Screen
        name="ConfirmarActivacion"
        component={ConfimacionActivacion}
        options={{
          title: "Activar tarjeta",
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },
        }}
      />

      <Stak.Screen
        name="ActivacionExitosa"
        component={ActivacionExitosa}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },

        }}
      />

          

       

    </Stak.Navigator>
  );
}

export { NavegacionRourter };

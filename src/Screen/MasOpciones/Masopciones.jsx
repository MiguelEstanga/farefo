import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Profile";
import { Preguntas } from "./Preguntas";
import { Reporte } from "./Reporte";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
import { MasContext } from "../../context/Mas";
import { useNavigation } from "@react-navigation/native";

function MasOpciones() {
    const Tab = createStackNavigator()
    const {option} = useContext(MasContext)
    const navegacion = useNavigation()
    useEffect(() => {
        console.log("menu de opciones")
        console.log(option)

       // if(option === "Reporte") return navegacion.navigate("Reporte")
    } , [option])
    return (  

        <Tab.Navigator>
                <Tab.Screen
                    name="Perfil"
                    component={Profile}
                    options={{
                       title:"Perfil",
                       headerTitleAlign:"center",
                       headerTintColor:"#152559",
                    }}
                />
             
        
             <Tab.Screen
                name="Preguntas"
                component={Preguntas}
                options={{
                    headerTitleAlign:"center",
                    headerTintColor:"#152559",
                  
                }}
            />        
          
            <Tab.Screen
                name="Reporte"
                component={Reporte}
                
                    options={{
                        headerTitleAlign:"center",
                        headerTintColor:"#152559",
                        title:'Reporte por Robo o extravío',
                       
                    }}
                
            />
        </Tab.Navigator>
    );
}

export default MasOpciones;
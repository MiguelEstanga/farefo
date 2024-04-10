import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import {  useEffect, useState } from "react";

import { preguntas } from "./preguntasData";
import axios from "axios";
import Loaded from "../../component/Loaded";
import { ModalAlert } from "../../component/Modal";
const Accordion = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={style.acordion}>
            <TouchableOpacity
                style={style.contenAcordion}
                onPress={toggleAccordion}>
                <Text style={style.pregunta} >{question}</Text>


            </TouchableOpacity>
            {expanded && <Text style={style.respuesta} >{answer}</Text>}
            {
                expanded == false ? (
                    <View
                        style={{
                            position: "absolute",
                            top: 35,
                            right: 20
                        }}
                    >
                        <Image
                            onProgress={() => setExpanded(!expanded)}
                            source={require("../../../assets/png/mas.png")}
                        />
                    </View>


                ) : (
                    <View
                        style={{
                            position: "absolute",
                            top: 35,
                            right: 20
                        }}
                    >
                        <Image
                            onProgress={() => setExpanded(!expanded)}
                            source={require("../../../assets/png/menos.png")}
                        />
                    </View>
                )
            }

        </View>
    );
};



export function Preguntas() {
    const [pgf, stePgf] = useState(null)
    const [preguntas_farefo , setPreguntas] = useState([])
    const [loaded , setLoaded ] = useState(false)
    const [modal , setModal] = useState(false)
    const [msm , setMsm] =useState("")
    useEffect(() => {
        setLoaded(true)
        const headers = {
            "Content-Type": "application/json",
             Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
          };
        axios.post('https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/PreguntasFrecuentes',
            {
                "IDTema": "1" ,//1 Generales y 2 Admistración de la tarjeta
                Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
            },
            {
                headers
            }
        )
        .then(res => {
            setPreguntas(res.data?.Preguntas)
        })
        .catch(error => {
            setMsm(error)
        })
        .finally(res => {
            setLoaded(false)
        })
    }, [])
    return (
        <>
        {loaded == true  ? (<Loaded/>) : ""}  
            <ModalAlert
                modal={modal}
                setmodal={setModal}
                mensage={msm}
            />
          <ScrollView style={{
            
          }}>
            <View style={style.container} >
                <View style={style.contenleyenda}  >
                    <Text style={style.leyenda}  >
                        En esta sección encontraras respuestas a la mayoría de tus dudas,
                        si no hemos respondido a tu pregunta comunícate con nosotros al correo:
                        credito@farefo.com
                    </Text>
                </View>
                <View>
                    {
                        preguntas_farefo.length > 0 ?(
                        preguntas_farefo?.map((res , index) => (

                            <Accordion
                                key={index}
                                question={res?.Pregunta ?? "Cargando ..."}
                                answer={res?.Respuesta ?? "Cargando ..."}
                            />
                        ))
                        ):(<Text> Cargando ... </Text>)
                    }

                </View>
            </View>
            </ScrollView>
        </>

    )
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center"
    },
    contenAcordion: {
        borderRadius: 9,
        justifyContent: "center",
        height: 48,
    },
    leyenda: {
        color: "#757474",
        fontSize: 14,
        width: 338,
        height: 98,
        lineHeight: 20,
    },
    contenleyenda: {

        marginTop: 20,


    },
    acordion: {

        width: 354,
        minHeight: 48,
        borderRadius: 9,

        padding: 16,



        shadowColor: '#4444',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,

    },
    pregunta: {
        color: "#152559",
        fontSize: 13,

    },
    respuesta: {
        color: "#757474",
        fontSize: 14,
        lineHeight: 25
    }
})
import React, { useEffect, useState ,useContext } from 'react';
import { View, Text } from 'react-native';
import ConfimacionPasswordLayout from '../../component/ConfimacionPasswordLayout';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../context/Login';
import {ModalAlert } from '../../component/Modal'
import { TarjetaContext } from '../../context/Tarjeta';
import { TranferenciaContext } from '../../context/Tranferencia';
import { httpTransferencia } from '../../api/Peticiones';
import Loaded from '../../component/Loaded';
import HeaderRegresar from '../../component/HeaderRegresar';
export default function ConfirmacionPasword() {
    const [password , setPassword] = useState('')
    const navegacion = useNavigation()
    const {credenciales} = useContext(LoginContext)
    const [modal, setModal] =useState(false);
    const {tarjeta} = useContext(TarjetaContext)
    const {tranferencia , setTranferenciaDatosExitoso} = useContext(TranferenciaContext)  
    const [loaded, setLoaded] = useState(false);
    const [textError , setTextError] = useState('');
    useEffect( () => {
        console.log( 'password', password) 
    },[password])

    const Confirmacion = async () =>{
        if(credenciales.password !== password){
            setModal(true)
            setTextError('Contraseña incorrecta ')
        }
       
        if(credenciales.password === password){
            const response = await httpTransferencia({ 
                    Token:credenciales.Token,
                    setLoaded:setLoaded,
                    Tarjeta:tarjeta.Tarjeta,
                    ConceptoPago:tranferencia.concepto,
                    CuentaBeneficiario:tranferencia.clabe,
                    Monto:tranferencia.monto,
                    referencias: parseInt( tranferencia.referencia )
                }) 

                if( response.CodRespuesta === "0000"){
                    setTranferenciaDatosExitoso(response)
                    navegacion.navigate('tranferenciaSuccess')
                }else{
                    setModal(true)
                    setTextError(
                        response.DescRespuesta
                    )
                }
            console.log("correcto" , response)
        }
        console.log(credenciales.password === password)
    }


    return (
        <View>
            {
                loaded ? <Loaded/> : null
            }
            <HeaderRegresar
                titulo='Transferencia'
                color='#152559'
                flechaColor='#D1103A'
            />
            <ModalAlert
                setmodal={setModal}
                modal={modal}
                mensage={textError}
            />
           <ConfimacionPasswordLayout
               confirmacion={Confirmacion}
               password={password}
               setPassword={setPassword}
               titulo="Para poder realizar tu transferencia escribe la contraseña con la cual te diste de alta en la aplicación."
           />
        </View>
    )
}
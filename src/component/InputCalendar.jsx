import DatePicker , {getFormatedDate ,  } from "react-native-modern-datepicker";
import { Modal, StyleSheet, TouchableOpacity, View , Text } from "react-native";
import {Calendar, LocaleConfig} from 'react-native-calendars';

import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons'; 
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
 
  monthNamesShort: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Juilio', 'Agosto', 'Septibre', 'Octubre.', 'Noviembre', 'Diciembre.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jeuves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jeuves', 'Viernes', 'Sabado'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';
function InputCalendar(
  {
    fecha, 
    label, 
    setData,
    fechaComparativa,
    exprecion

  }) {
  const [date, setDate] = useState(fecha);
  const [open , setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handle_get_data = (dateprop) => {
    const [ano , mes , dia] = dateprop.split('-')
    const parsefecha = fechaComparativa.split("-")

    const fecha1 = new Date(`${ano}-${mes}-${dia}`)

    const fecha2 = new Date(`${parsefecha[0]}-${parsefecha[1]}-${parsefecha[2]}`);

   
    if(exprecion == 0)
    {
        if(fecha1 > fecha2 ) return 
    }

  
    setOpen(!open)
    setDate(`${ano}-${mes}-${dia}`)
    setData(`${ano}-${mes}-${dia}`)
   // setDate(dateprop);
  };

  useEffect(()=>{
   
  } , [open ,date , selected ])
  
  function fechaformat(fecha){
    const day = fecha.split("-")[2]
    const month = fecha.split("-")[1]
    const year = fecha.split("-")[0]
   
    return `${day}-${month}-${year}`;
  };
  return (
    <View style={{width:"100%"}} >
        <Text style={{fontSize:14 , color:"#152559", fontWeight:"500" }} >
            {label}
        </Text>
      <TouchableOpacity 
        style={style.calendar}
        onPress={() => {setOpen(!open)}}
    >
        <Text style={{color:"#707070"}} >
             {fechaformat(fecha)} 
        </Text>
        <Text onPress={() => setOpen(!open) } >
             <Feather name="calendar" size={17} color="#707070" />
        </Text>
      
    </TouchableOpacity>
      <View
        style={{
          width: "90%",
          height: 400,
        }}
      >
        <Modal visible={open} transparent={true} animationType="slide" >
        <Calendar
            
            style={{
              position:"absolute",
              top:400,
              height:240,
              width:347,
              left:10
            }}
            onDayPress={day => {
              handle_get_data(day.dateString)
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
          />
        
        </Modal>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  calendar: {
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderColor: "#2F3D6B",
    borderRadius: 4,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },

});
export default InputCalendar;

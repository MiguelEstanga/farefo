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
    'Marzo',
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
function InputCalendar({fecha, label , setData}) {
  const [date, setDate] = useState(fecha);
  const [open , setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const handle_get_data = (dateprop) => {
    
    const [ano , mes , dia] = dateprop.split('-')
    console.log("tiem calendar")
    console.log(`${dia}-${mes}-${ano}`)
   

    setOpen(!open)
    setDate(`${dia}-${mes}-${ano}`)
    setData(`${ano}-${mes}-${dia}`)
   // setDate(dateprop);
  };

  useEffect(()=>{
    console.log("react-native-calendar")
    console.log(selected)
  } , [open ,date , selected])
 
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
             {date} 
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

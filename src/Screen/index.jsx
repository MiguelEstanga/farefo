import {  useContext } from "react";
import { NavegacionRourter } from "../../router";
import {SubmenuContext } from "../context/SubMenuContex";
import { SafeAreaViewComponent } from "react-native";
import MenuModal from "../component/MenuModal";

function Index() {
  const {modal} = useContext(SubmenuContext)
  

 
  return (
    <>
      <NavegacionRourter />
      {modal== true ? (<MenuModal/>) : '' }
    </>
  );
}


export default Index;

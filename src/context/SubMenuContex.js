import { createContext, useState } from "react";

export const SubmenuContext = createContext();

export function SubMenuProvider({ children }) {
  const [modal, setModalMenu] = useState(false);
  
  return (
    <SubmenuContext.Provider
      value={{
        modal,
        setModalMenu,
        
      }}
    >
      {children}
    </SubmenuContext.Provider>
  );
}

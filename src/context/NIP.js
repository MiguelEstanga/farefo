import { createContext, useState } from "react";

export const NipContext = createContext()
function NIP({children}) {
    const [nip , setNip] = useState({})
    return ( <NipContext.Provider
        value={{nip ,setNip}}
    >
        {children}
    </NipContext.Provider> );
}

export default NIP;
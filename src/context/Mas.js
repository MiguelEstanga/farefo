import { createContext, useState } from "react";

 export const MasContext = createContext()
function MAS({
    children
}) {
    const [option , setOption] = useState(1)
    return ( <MasContext.Provider
        value={{
            option,
            setOption
        }}
    >
        {children}
    </MasContext.Provider> );
}

export default MAS;
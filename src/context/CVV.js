import { createContext , useState} from "react";

 export const CvvContext = createContext()


function CVVProvider({children}) {
    const [cvv , setCvv] = useState(3)
    const [cvvTime , setCvvTime] = useState(0)
    return ( 
        <CvvContext.Provider
            value={{
                cvv,
                setCvv,
               cvvTime,
               setCvvTime
            }}
        >
            {children}
        </CvvContext.Provider>

     );
}

export default CVVProvider;
import { createContext , useState} from 'react'
 export const RegistroContext =  createContext()
function Registro({children}) {
    const [telefonoRegistro , setTelefonoRegistro] = useState()
    const [data , setData] = useState({})
    const [code , setCode] = useState()
    const [telefonoC , setTelefonoC] = useState(0)
    return ( 

        <RegistroContext.Provider
            value={{
                telefonoRegistro,
                setTelefonoRegistro,
                data,
                setData,
                telefonoC,
                setTelefonoC,
                setCode,
                code
            }}
        >
            {children}
        </RegistroContext.Provider>
     );
}

export default Registro;
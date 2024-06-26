

import { SubMenuProvider } from "./src/context/SubMenuContex";
import Index from "./src/Screen/index";
import LoginProvier from "./src/context/Login";
import { NavigationContainer } from "@react-navigation/native";
import TarjetaProvider from "./src/context/Tarjeta";
import NIP from "./src/context/NIP";
import CVVProvider from "./src/context/CVV";
import Registro from "./src/context/Registrar";
import MAS from "./src/context/Mas";
import DetalleComprasProvider from "./src/context/DetallesCompraContext"
import StatusProvider from "./src/context/StatusContex";
import TranferenciaProvider from "./src/context/Tranferencia";

export default function App() {
  return (
    <NavigationContainer>
      <SubMenuProvider>
        <LoginProvier>
          <TarjetaProvider>
            <NIP>
              <CVVProvider>
                <StatusProvider>
                <DetalleComprasProvider>
                  <TranferenciaProvider>
                    <MAS>
                      <Registro>
                        <Index />
                      </Registro>
                    </MAS>
                  </TranferenciaProvider>
                </DetalleComprasProvider>
                </StatusProvider>
              </CVVProvider>
            </NIP>
          </TarjetaProvider>
        </LoginProvier>
      </SubMenuProvider>
    </NavigationContainer>
  );
}

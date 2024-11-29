import "../styles/global.css";
import Routes from "../routes";
import { StatusBar } from "expo-status-bar"; 
import { TrufaProvider } from "../global/TrufaContext";
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />  
      <TrufaProvider>
        <Routes />
      </TrufaProvider>
    </>
  )
}

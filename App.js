import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./app/context/auth";
import Routes from "./app/routes";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
       <Routes /> 
      </AuthProvider>
    </NavigationContainer>
  );
}

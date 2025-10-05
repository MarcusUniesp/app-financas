import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  async function signUp(name, password, email) {
    try {
      await api.post("/users", {
        name: name,
        password: password,
        email: email,
      });

      console.log("Usuário cadastrado com sucesso");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao cadastrar usuário", err);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

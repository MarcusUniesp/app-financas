import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  //? Create a new user
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

  //? Login function
  async function signIn(email, password) {
    try {
      const resp = await api.post("/login", {
        email: email,
        password: password,
      });

      const { token } = resp.data;

      await AsyncStorage.setItem("token", token);

      console.log("Login realizado com sucesso");
      setUser({ email });

      return token;
    } catch (error) {
      console.log("Erro ao realizar login", error);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

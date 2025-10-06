import {
  BackGround,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";

export default function SignIn() {
  const navigation = useNavigation();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (email === "" || password === "") {
      console.log("Preencha todos os campos");
      return;
    }
    signIn(email, password);
  }

  return (
    <BackGround>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <Logo
          source={require("../../../assets/Logo.png")}
          resizeMode="contain"
        />

        <AreaInput>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleSignIn}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta gratuita</LinkText>
        </Link>
      </Container>
    </BackGround>
  );
}

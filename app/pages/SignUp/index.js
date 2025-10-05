import {
  BackGround,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "./styles";
import { Platform } from "react-native";
import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (name === "" || email === "" || password === "") {
      console.log("Preencha todos os campos");
      return;
    }
    signUp(name, password, email);
  }

  return (
    <BackGround>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <AreaInput>
          <Input
            placeholder="Seu nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>

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
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </BackGround>
  );
}

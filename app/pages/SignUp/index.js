import {
  BackGround,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "./styles";
import { Platform } from 'react-native';

export default function SignUp() {
  return (
    <BackGround>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <AreaInput>
          <Input placeholder="Seu nome" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Email" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Senha" secureTextEntry={true} />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </BackGround>
  );
}

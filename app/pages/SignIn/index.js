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
import { Platform } from 'react-native';

export default function SignIn() {
  const navigation = useNavigation();

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
          <Input placeholder="Email" />
        </AreaInput>

        <AreaInput>
          <Input placeholder="Senha" secureTextEntry />
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta gratuita</LinkText>
        </Link>
      </Container>
    </BackGround>
  );
}

import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerContainer,
  DrawerHeader,
  DrawerLogo,
  WelcomeText,
  DrawerItemStyled,
  DrawerLabel,
} from "./styles";

const CustomDrawerContent = (props) => {
  const { state, navigation, descriptors } = props;

  return (
    <DrawerContainer>
      <DrawerHeader>
        <DrawerLogo source={require("../../../assets/Logo.png")} />
        <WelcomeText>Bem-vindo</WelcomeText>
      </DrawerHeader>

      <DrawerContentScrollView {...props}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.drawerLabel !== undefined
              ? options.drawerLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "drawerItemPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <DrawerItemStyled key={route.key} active={isFocused}>
              <DrawerLabel active={isFocused} onPress={onPress}>
                {label}
              </DrawerLabel>
            </DrawerItemStyled>
          );
        })}
      </DrawerContentScrollView>
    </DrawerContainer>
  );
};

export default CustomDrawerContent;

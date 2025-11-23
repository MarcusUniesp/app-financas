import { View } from "react-native";
import styled from "styled-components/native";

export const DrawerContainer = styled(View)`
  flex: 1;
  background-color: #f0f4ff;
`;

export const DrawerHeader = styled(View)`
  align-items: center;
  padding-top: 30px;
  padding-bottom: 20px;
  background-color: #f0f4ff;
`;

export const DrawerLogo = styled.Image`
  margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

export const DrawerItemStyled = styled.View`
  margin-vertical: 4px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#3B3DBF" : "#F0F4FF")};
`;

export const DrawerLabel = styled.Text`
  font-size: 16px;
  padding: 14px 20px;
  color: ${({ active }) => (active ? "#fff" : "black")};
  font-weight: ${({ active }) => (active ? "600" : "500")};
`;

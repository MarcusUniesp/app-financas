import styled from "styled-components/native";

export const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.View`
  width: 85%;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  elevation: 6;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

export const ModalMessage = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
  color: #333;
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 10px 20px;
`;

export const ModalButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

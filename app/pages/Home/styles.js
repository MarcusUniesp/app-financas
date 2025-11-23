import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const ScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    columnGap: 20,
  },
})`
  margin-top: 20px;
`;

export const Card = styled.View`
  width: 305px;
  height: 136px;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 4px;
`;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const CardValue = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;

export const Section = styled.View`
  width: 100%;
  margin-top: 25px;
`;

export const SectionTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const SectionIcon = styled(Ionicons).attrs({
  size: 20,
  color: "#000",
})`
  margin-right: 8px;
`;

export const MovCard = styled.TouchableOpacity`
  width: 100%;
  background-color: #f0f4ff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
`;

export const MovValue = styled.Text`
  font-size: 20px;
  margin-top: 5px;
  color: #000;
`;

export const TypeBadge = styled.View`
  background-color: ${({ type }) =>
    type === "despesa" ? "#EF463A" : "#00B94A"};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: 3px 10px;
`;

export const TypeText = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  font-weight: 500;
  font-style: italic;
`;

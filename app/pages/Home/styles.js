import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 16,
    columnGap: 20
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


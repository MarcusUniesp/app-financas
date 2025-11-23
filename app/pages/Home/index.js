import {
  ScrollContainer,
  Card,
  CardTitle,
  CardValue,
  Section,
  SectionTitleRow,
  SectionIcon,
  SectionTitle,
  MovCard,
  TypeBadge,
  TypeText,
  MovValue,
} from "./styles";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ConfirmDialog from "../../components/Modal";

export default function Home() {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleDelete = () => {
    console.log("DELETADO!");
    setDialogVisible(false);
  };

  const data = [
    { id: 1, type: "despesa", value: 35.3 },
    { id: 2, type: "receita", value: 780.3 },
    { id: 3, type: "receita", value: 50 },
    { id: 4, type: "despesa", value: 155.9 },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      ListHeaderComponent={
        <>
          <ScrollContainer>
            <Card style={{ backgroundColor: "#3B3DBF" }}>
              <CardTitle>Saldo atual</CardTitle>
              <CardValue>R$ 1.314,70</CardValue>
            </Card>

            <Card style={{ backgroundColor: "#00B94A" }}>
              <CardTitle>Entradas de hoje</CardTitle>
              <CardValue>R$ 1.200,00</CardValue>
            </Card>

            <Card style={{ backgroundColor: "#EF463A" }}>
              <CardTitle>Saídas de hoje</CardTitle>
              <CardValue>R$ 500,00</CardValue>
            </Card>
          </ScrollContainer>

          <Section>
            <SectionTitleRow>
              <SectionIcon name="calendar-outline" />
              <SectionTitle>Ultimas movimentações</SectionTitle>
            </SectionTitleRow>
          </Section>

          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <MovCard onPress={() => setDialogVisible(true)}>
                <TypeBadge type={item.type}>
                  <Ionicons
                    name={item.type === "despesa" ? "arrow-down" : "arrow-up"}
                    size={14}
                    color="#fff"
                  />
                  <TypeText>{item.type}</TypeText>
                </TypeBadge>
                <MovValue>R$ {item.value}</MovValue>
              </MovCard>
            )}
          />

          <ConfirmDialog
            visible={dialogVisible}
            onCancel={() => setDialogVisible(false)}
            onConfirm={handleDelete}
          />
        </>
      }
    />
  );
}

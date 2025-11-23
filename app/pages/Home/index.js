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
import { FlatList, Modal, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import ConfirmDialog from "../../components/Modal";

export default function Home() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
              <SectionIcon
                name="calendar-outline"
                onPress={() => setCalendarVisible(true)}
              />
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

          {calendarVisible && (
            <Modal
              transparent
              animationType="fade"
              visible={calendarVisible}
              onRequestClose={() => setCalendarVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 20,
                    width: "100%",
                  }}
                >
                  <Calendar
                    onDayPress={(day) => {
                      console.log("Data selecionada:", day.dateString);
                      setSelectedDate(day.dateString);
                      setCalendarVisible(false);
                    }}
                    theme={{
                      todayTextColor: "#3B3DBF",
                      selectedDayBackgroundColor: "#3B3DBF",
                      selectedDayTextColor: "#fff",
                      arrowColor: "#3B3DBF",
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B3DBF",
                      paddingVertical: 12,
                      borderRadius: 8,
                      marginTop: 15,
                    }}
                    onPress={() => {
                      setCalendarVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Filtrar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </>
      }
    />
  );
}

import {
  getBalance,
  getReceivesByDate,
  deleteReceive,
} from "../../services/financeService";
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
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { Calendar } from "react-native-calendars";
import ConfirmDialog from "../../components/Modal";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ Função para formatar data no padrão DD/MM/YYYY
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Carrega os dados da API
  const loadHomeData = async (
    dateISO = new Date().toISOString().split("T")[0]
  ) => {
    const dateBR = formatDate(dateISO);
    console.log("🔍 Carregando dados para:", dateBR);

    setLoading(true);
    setError(null);

    try {
      const balanceResponse = await getBalance(dateBR);
      console.log("✅ Resposta bruta de /balance:", balanceResponse);

      // ✅ Mapeia a resposta da API para o formato esperado
      const mappedData = {
        balance: 0,
        income: 0,
        expense: 0,
      };

      // Percorre o array e atribui com base na tag
      balanceResponse.forEach((item) => {
        switch (item.tag) {
          case "saldo":
            mappedData.balance = item.saldo;
            break;
          case "receita":
            mappedData.income = item.saldo;
            break;
          case "despesa":
            mappedData.expense = item.saldo;
            break;
          default:
            console.warn("⚠️ Tag desconhecida na resposta:", item.tag);
        }
      });

      console.log("✅ Dados mapeados:", mappedData);
      setBalanceData(mappedData);

      // Movimentações (essa parte provavelmente já está certa)
      const movementsResponse = await getReceivesByDate(dateBR);
      console.log("✅ Movimentações:", movementsResponse);
      setMovements(Array.isArray(movementsResponse) ? movementsResponse : []);
    } catch (err) {
      console.error("❌ Erro detalhado:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(
        err.response?.data?.message || err.message || "Erro ao carregar dados"
      );
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Carrega ao montar
  useEffect(() => {
    loadHomeData();
  }, []);

  // ✅ Recarrega quando a tela ganha foco (ex: após voltar do Register)
  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [])
  );

  // ✅ Deletar movimentação
  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteReceive(selectedItem.id);
      setMovements((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      );
      setDialogVisible(false);
      setSelectedItem(null);
      Alert.alert("Sucesso!", "Movimentação excluída.");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert("Erro", "Não foi possível excluir a movimentação.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cards de saldo */}
      <ScrollContainer>
        <Card style={{ backgroundColor: "#3B3DBF" }}>
          <CardTitle>Saldo atual</CardTitle>
          <CardValue>R$ {balanceData.balance.toFixed(2)}</CardValue>
        </Card>

        <Card style={{ backgroundColor: "#00B94A" }}>
          <CardTitle>Entradas de hoje</CardTitle>
          <CardValue>R$ {balanceData.income.toFixed(2)}</CardValue>
        </Card>

        <Card style={{ backgroundColor: "#EF463A" }}>
          <CardTitle>Saídas de hoje</CardTitle>
          <CardValue>R$ {balanceData.expense.toFixed(2)}</CardValue>
        </Card>
      </ScrollContainer>

      {/* Seção de movimentações */}
      <Section>
        <SectionTitleRow>
          <SectionIcon
            name="calendar-outline"
            onPress={() => setCalendarVisible(true)}
          />
          <SectionTitle>Últimas movimentações</SectionTitle>
        </SectionTitleRow>
      </Section>

      {/* Loading ou erro */}
      {loading && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ActivityIndicator size="large" color="#3B3DBF" />
          <Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
        </View>
      )}

      {error && !loading && (
        <Text style={{ textAlign: "center", color: "red", marginVertical: 10 }}>
          {error}
        </Text>
      )}

      {/* Lista de movimentações */}
      <View style={{ marginTop: 10 }}>
        <View>
          {movements.length === 0 && !loading ? (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
              Nenhuma movimentação encontrada.
            </Text>
          ) : (
            movements.map((item) => (
              <MovCard
                key={String(item.id)}
                onPress={() => {
                  setSelectedItem(item);
                  setDialogVisible(true);
                }}
              >
                <TypeBadge type={item.type}>
                  <Ionicons
                    name={item.type === "despesa" ? "arrow-down" : "arrow-up"}
                    size={14}
                    color="#fff"
                  />
                  <TypeText>{item.type}</TypeText>
                </TypeBadge>
                <MovValue>R$ {Number(item.value).toFixed(2)}</MovValue>
              </MovCard>
            ))
          )}
        </View>
      </View>

      {/* Modal de confirmação */}
      <ConfirmDialog
        visible={dialogVisible}
        onCancel={() => {
          setDialogVisible(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDelete}
      />

      {/* Modal do calendário */}
      {calendarVisible && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            zIndex: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              width: "100%",
              maxHeight: "80%",
            }}
          >
            <Calendar
              onDayPress={(day) => {
                const dateISO = day.dateString; // ex: "2025-11-30"
                setSelectedDate(dateISO);
                setCalendarVisible(false);
                loadHomeData(dateISO); // recarrega com a nova data
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
                alignItems: "center",
              }}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

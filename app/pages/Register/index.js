import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { createReceive } from "../../services/financeService";

export default function Register() {
  const [tipo, setTipo] = useState("receita");
  const [nome, setNome] = useState(""); // para o campo "Nome"
  const [valor, setValor] = useState(""); // para o campo "Valor"
  const [loading, setLoading] = useState(false); // para o botão de loading

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleRegistrar = async () => {
    // Validação simples
    if (!nome.trim()) {
      Alert.alert("Atenção", "Informe um nome para a movimentação.");
      return;
    }
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      Alert.alert("Atenção", "Informe um valor válido.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        description: nome.trim(),
        value: parseFloat(valor),
        type: tipo, // "receita" ou "despesa"
        date: formatDate(new Date()), // ex: "30/11/2025"
      };

      await createReceive(payload);

      Alert.alert("Sucesso!", "Registro realizado com sucesso!");

      // Limpa os campos
      setNome("");
      setValor("");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      Alert.alert(
        "Erro",
        error.message || "Não foi possível salvar o registro."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      {/* Campo Nome */}
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo Valor */}
      <TextInput
        placeholder="Valor desejado"
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
      />

      {/* Botões Receita / Despesa */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            tipo === "receita" && styles.typeSelectedButton,
          ]}
          onPress={() => setTipo("receita")}
        >
          <Feather name="arrow-up" size={20} />
          <Text style={[styles.typeText]}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            tipo === "despesa" && styles.typeSelectedButton,
          ]}
          onPress={() => setTipo("despesa")}
        >
          <Feather name="arrow-down" size={20} />
          <Text style={[styles.typeText]}>Despesa</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Registrar */}
      <TouchableOpacity
        style={[styles.btnRegistrar, loading && { opacity: 0.7 }]}
        onPress={handleRegistrar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Registrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eef2ff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    elevation: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  typeSelectedButton: {
    borderColor: "#3B3DBF",
    borderWidth: 2,
    backgroundColor: "white",
  },

  typeText: {
    fontSize: 16,
    marginLeft: 8,
  },

  btnRegistrar: {
    backgroundColor: "#00a83b",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

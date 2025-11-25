import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Register() {
  const [tipo, setTipo] = useState("receita");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      {/* Campo Nome */}
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={styles.input}
      />

      {/* Campo Valor */}
      <TextInput
        placeholder="Valor desejado"
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={styles.input}
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
      <TouchableOpacity style={styles.btnRegistrar}>
        <Text style={styles.btnText}>Registrar</Text>
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

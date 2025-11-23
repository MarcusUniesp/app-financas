import { ScrollContainer, Card, CardTitle, CardValue } from "./styles";

export default function Home() {
  return (
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
  );
}

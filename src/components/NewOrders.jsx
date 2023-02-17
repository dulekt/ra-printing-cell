import { Card, Heading, Button, Divider } from "@chakra-ui/react";

function handlePrint(id) {
  fetch(`http://localhost:5000/print/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default function NewOrders({ newOrders }) {
  console.log("new", newOrders);
  return (
    <div>
      <h1>Nowe Zamówienia</h1>
      {newOrders.map((order) => (
        <Card key={order.id}>
          <Heading size="xs">
            {order.user + " "}
            {order.workcenter}
          </Heading>
          {order.datetime.split("T")[0]}{" "}
          {order.datetime.split("T")[1].split(".")[0]}
          <br></br>
          {"Extra content"}
          <Button
            size="xs"
            variant="outline"
            colorScheme="blue"
            onClick={() => handlePrint(order.id)}
          >
            Print
          </Button>
        </Card>
      ))}
    </div>
  );
}

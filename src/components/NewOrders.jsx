import {
  Card,
  Heading,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Input,
  Box,
  Text,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import preparePrintPayload from "../data/preparePrintPayload";

function handlePrint(id) {
  const payload = preparePrintPayload(["123", "456", "789"]);
  console.log("payload", payload);
}
//get date from postgres datetime
function getDate(datetime) {
  const fullDate = datetime.split("T")[0];

  const reverseDate = fullDate.split("-").reverse();
  const DD = reverseDate[0];
  const MM = reverseDate[1];
  const date = `${DD}/${MM}`;
  return date;
}

//get time from postgres datetime
function getTime(datetime) {
  const time = datetime.split("T")[1].split(".")[0];
  const HH = time.split(":")[0];
  const MM = time.split(":")[1];
  const HHMM = `${HH}:${MM}`;
  return HHMM;
}

export default function NewOrders({ newOrders }) {
  console.log("new", newOrders);
  return (
    <div>
      <h1>Nowe Zamówienia</h1>
      {newOrders.length === 0 && <p color="red">Brak nowych zamówień</p>}

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Order type</Th>
            <Th>Imie</Th>
            <Th>Stanowisko</Th>
            <Th>Print</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{getDate(order.datetime)}</Td>
              <Td>{getTime(order.datetime)}</Td>
              <Td>{order.order_type}</Td>
              <Td>{order.user}</Td>
              <Td>{order.workcenter}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handlePrint(order.id)}
                >
                  Print
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

function handlePrint(id) {
  console.log(id);
  const sendPrintRequest = async (id) => {
    const response = await fetch(`http://localhost:5000/print_cell/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  sendPrintRequest(id);
}
function getDate(datetime) {
  const fullDate = datetime.split("T")[0];

  const reverseDate = fullDate.split("-").reverse();
  const DD = reverseDate[0];
  const MM = reverseDate[1];
  const date = `${DD}/${MM}`;
  return date;
}

function getTime(datetime) {
  const time = datetime.split("T")[1].split(".")[0];
  const HH = time.split(":")[0];
  const MM = time.split(":")[1];
  const HHMM = `${HH}:${MM}`;
  return HHMM;
}

export default function NewOrders({ newOrders, fetchOrders }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleClick(id) {
    handlePrint(id);
    fetchOrders();
  }
  return (
    <div>
      {newOrders.length === 0 && (
        <Text fontSize="xl" fontWeight="bold" color="red.500">
          Brak nowych zamówień
        </Text>
      )}

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
                {order.order_type === "Naklejki" ? (
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handlePrint(order.id)}
                  >
                    Print
                  </Button>
                ) : (
                  <Button colorScheme="green" size="sm" onClick={onOpen}>
                    Show
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            {
              //todo  order.order_type="Oznaczenia plastikowe"  grupa=order.id, tresc=order.order_type,ilosc=order.quantity,nosnik=order.nosnik
              //todo  order.order_type="Naklejki"              header(order.user,order.workcenter) body(order.labelType------order.description)
            }

            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Grupa</Th>
                  <Th>Tresc</Th>
                  <Th>Ilość</Th>
                  <Th>Nosnik</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>16701|1|bdytko</Td>
                  <Td>CSH1-L1A</Td>
                  <Td>18</Td>
                  <Td>1</Td>
                </Tr>
                <Tr>
                  <Td>16701|1|bdytko</Td>
                  <Td>CSH1-L1A</Td>
                  <Td>18</Td>
                  <Td>1</Td>
                </Tr>
                <Tr>
                  <Td>16702|5|mulikow</Td>
                  <Td>S6</Td>
                  <Td>12</Td>
                  <Td>1</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            {
              //todo copy to clipboard secondary action
            }
            <Button colorScheme="blue" mr={3} variant="outline">
              Copy to clipboard
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

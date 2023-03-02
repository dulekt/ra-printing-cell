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
export default function OldOrders({ oldOrders }) {
  return (
    <div>
      {oldOrders.length > 0 && (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Order type</Th>
              <Th>Imie</Th>
              <Th>Stanowisko</Th>
              <Th>Print</Th>
            </Tr>
          </Thead>
          <Tbody>
            {oldOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.datetime}</Td>
                <Td>{order.order_type}</Td>
                <Td>{order.user}</Td>
                <Td>{order.workcenter}</Td>
                <Td>
                  <Button onClick={() => handlePrint(order._id)}>Print</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
}

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Input,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function PrinterUI() {
  const [printers, setPrinters] = useState([]);
  const fetchPrinters = async () => {
    const response = await fetch("http://localhost:5000/printers");
    const data = await response.json();
    setPrinters(Object.values(data));
  };
  useEffect(() => {
    fetchPrinters();
  }, []);

  const handleAdd = async (e) => {
    const name = document.getElementById("printerName").value;
    const printerIP = document.getElementById("printerIP").value;
    const printerPort = document.getElementById("printerPort").value;
    const printerDPI = document.getElementById("printerDPI").value;
    const workcenter = document.getElementById("workcenter").value;
    const response = await fetch("http://localhost:5000/printers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        printerName: name,
        printerIP: printerIP,
        printerPort: printerPort,
        printerDPI: printerDPI,
        workcenter: workcenter,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchPrinters();
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5000/printers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    fetchPrinters();
  };

  return (
    <div margin="auto" width="50%">
      <h1>Drukarki</h1>
      <Box m={10}>
        <Text>Dodaj nową drukarkę</Text>
        <SimpleGrid columns={3} spacing={3}>
          <FormControl id="printerName">
            <Input type="text" placeholder="Printer Name" />
          </FormControl>
          <FormControl id="printerIP">
            <Input type="text" placeholder="IP" />
          </FormControl>
          <FormControl id="printerPort">
            <Input type="text" placeholder="Port" />
          </FormControl>
          <FormControl id="printerDPI">
            <Input type="text" placeholder="DPI" />
          </FormControl>
          <FormControl id="workcenter">
            <Input type="text" placeholder="Workcenter" />
          </FormControl>
          <Button colorScheme="blue" onClick={handleAdd}>
            Add
          </Button>
        </SimpleGrid>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nazwa</Th>
              <Th>IP</Th>
              <Th>Port</Th>
              <Th>DPI</Th>
              <Th>Workcenter</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {printers.map((printer) => (
              <Tr key={printer.printerID}>
                <Td>{printer.printerName}</Td>
                <Td>{printer.printerIP}</Td>
                <Td>{printer.printerPort}</Td>
                <Td>{printer.printerDPI}</Td>
                <Td>{printer.workcenter}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(printer.printerID)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

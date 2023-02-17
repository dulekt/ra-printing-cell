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

export default function LabelUI() {
  const [labels, setLabels] = useState([]);
  const fetchLabels = async () => {
    const response = await fetch("http://localhost:5000/labels");
    const data = await response.json();
    setLabels(Object.values(data));
  };
  useEffect(() => {
    fetchLabels();
  }, []);
  const handleAdd = async (e) => {
    const label = document.getElementById("label").value;
    const label_description =
      document.getElementById("label_description").value;
    const font_size = document.getElementById("font_size").value;
    const max_length = document.getElementById("max_length").value;
    const labels_in_row = document.getElementById("labels_in_row").value;
    const print_cell_printer =
      document.getElementById("print_cell_printer").value;
    const workcenter_printers =
      document.getElementById("workcenter_printer").value;
    const response = await fetch("http://localhost:5000/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: label,
        label_description: label_description,
        font_size: font_size,
        max_length: max_length,
        labels_in_row: labels_in_row,
        print_cell_printer: print_cell_printer,
        workcenter_printers: workcenter_printers,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchLabels();
  };
  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5000/labels/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchLabels();
  };

  return (
    <Box p={2}>
      <Center>
        <Box w="100%" p={1} color="white">
          <SimpleGrid columns={4} spacing={1}>
            <FormControl id="label">
              <Input placeholder="Etykieta" />
            </FormControl>
            <FormControl id="label_description">
              <Input placeholder="Opis etykiety" />
            </FormControl>
            <FormControl id="font_size">
              <Input placeholder="Rozmiar czcionki" />
            </FormControl>
            <FormControl id="max_length">
              <Input placeholder="Maksymalna długość" />
            </FormControl>
            <FormControl id="labels_in_row">
              <Input placeholder="Ilość etykiet w rzędzie" />
            </FormControl>
            <FormControl id="print_cell_printer">
              <Input placeholder="Drukarka komórki" />
            </FormControl>
            <FormControl id="workcenter_printer">
              <Input placeholder="Drukarka workcenter" />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAdd}>
              Dodaj
            </Button>
          </SimpleGrid>
        </Box>
      </Center>
      <Center>
        <Box p={1}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Etykieta</Th>
                <Th>Opis etykiety</Th>
                <Th>Rozmiar czcionki</Th>
                <Th>Maksymalna długość</Th>
                <Th>Ilość etykiet w rzędzie</Th>
                <Th>Drukarka komórki</Th>
                <Th>Drukarka workcenter</Th>
                <Th>Usun</Th>
              </Tr>
            </Thead>
            <Tbody>
              {labels.map((label) => (
                <Tr key={label.id}>
                  <Td>{label.label}</Td>
                  <Td>{label.label_description}</Td>
                  <Td>{label.font_size}</Td>
                  <Td>{label.max_length}</Td>
                  <Td>{label.labels_in_row}</Td>
                  <Td>{label.print_cell_printer}</Td>
                  <Td>{label.workcenter_printers}</Td>
                  <Td>
                    <Button onClick={() => handleDelete(label.id)}>X</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </Box>
  );
}

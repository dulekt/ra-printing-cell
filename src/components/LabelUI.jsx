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
  Select,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LabelUI() {
  const [labels, setLabels] = useState([]);
  const [printers, setPrinters] = useState([]);
  const fetchLabels = async () => {
    const response = await fetch("http://localhost:5000/labels");
    const data = await response.json();
    setLabels(Object.values(data));
  };
  const fetchPrinters = async () => {
    const response = await fetch("http://localhost:5000/printers");
    const data = await response.json();
    const dataArr = Object.values(data);
    const printerArr = dataArr.map((printer) => printer.printerName);
    setPrinters(printerArr);
    console.log("printers: ", printerArr);
  };

  useEffect(() => {
    fetchLabels();
    fetchPrinters();
  }, []);
  const handleAdd = async (e) => {
    const label = document.getElementById("label").value;
    const label_width = document.getElementById("label_width").value;
    const label_height = document.getElementById("label_height").value;
    const ribbonWidth = document.getElementById("ribbon_width").value;
    const label_x0 = document.getElementById("label_x0").value;
    const font_size = document.getElementById("font_size").value;
    const labels_in_row = document.getElementById("labels_in_row").value;
    const print_cell_printer =
      document.getElementById("print_cell_printer").value;
    const lines_of_text = document.getElementById("lines_of_text").value;

    const response = await fetch("http://localhost:5000/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: label,
        label_width: label_width,
        label_height: label_height,
        ribbon_width: ribbonWidth,
        label_x0: label_x0,
        font_size: font_size,
        labels_in_row: labels_in_row,
        print_cell_printer: print_cell_printer,
        lines_of_text: lines_of_text,
      }),
    });
    const data = await response.json();
    fetchLabels();
  };

  const handleDelete = async (id) => {
    console.log("id: ", id);
    const response = await fetch(`http://localhost:5000/labels/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    fetchLabels();
    fetchPrinters();
  };

  return (
    <Box p={2}>
      <Box w="100%" p={1} color="green">
        <SimpleGrid columns={6} spacing={1}>
          <FormControl id="label">
            <Input placeholder="Etykieta" />
          </FormControl>
          <FormControl id="label_width">
            <Input placeholder="Szerokość etykiety" />
          </FormControl>
          <FormControl id="label_height">
            <Input placeholder="Wysokość etykiety" />
          </FormControl>
          <FormControl id="ribbon_width">
            <Input placeholder="Szerokość taśmy" />
          </FormControl>
          <FormControl id="label_x0">
            <Input placeholder="x_0" />
          </FormControl>

          <FormControl id="font_size">
            <Input placeholder="Rozmiar czcionki" />
          </FormControl>

          <FormControl id="labels_in_row">
            <Input placeholder="Ilość etykiet w rzędzie" />
          </FormControl>
          <FormControl id="print_cell_printer">
            <Select placeholder="Drukarka celka">
              {printers.map((printer) => (
                <option key={printer}>{printer}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="lines_of_text">
            <Input placeholder="Ilość linii tekstu" />
          </FormControl>

          <Button m={1} size="sm" colorScheme="blue" onClick={handleAdd}>
            Dodaj
          </Button>
        </SimpleGrid>
      </Box>

      <Center>
        <Box p={1}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Etykieta</Th>
                <Th>Szerokość etykiety</Th>
                <Th>Wysokość etykiety</Th>
                <Th>Szerokość taśmy</Th>
                <Th>x_0</Th>
                <Th>Rozmiar czcionki</Th>
                <Th>Etykiet w rzędzie</Th>
                <Th>Drukarka celka</Th>
                <Th>Ilość linii tekstu</Th>
                <Th>Usuń</Th>
              </Tr>
            </Thead>
            <Tbody>
              {labels.map((label) => (
                <Tr key={label.labelID}>
                  <Td>{label.label}</Td>
                  <Td>{label.label_width}</Td>
                  <Td>{label.label_height}</Td>
                  <Td>{label.ribbon_width}</Td>
                  <Td>{label.label_x0}</Td>
                  <Td>{label.font_size}</Td>
                  <Td>{label.labels_in_row}</Td>
                  <Td>{label.print_cell_printer}</Td>
                  <Td>{label.lines_of_text}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(label.labelID)}
                    >
                      X
                    </Button>
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

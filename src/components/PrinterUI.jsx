import {
  Table,
  Thead,
  Tbody,

  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  FormControl,
  SimpleGrid,
  Input,
  Box,
  Text,



  Select,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function PrinterUI({ printers, workcenters, isLoading, isError, errorMessage }) {

  const handleAdd = async e => {
    const name = document.getElementById('printerName').value;
    const printerIP = document.getElementById('printerIP').value;
    const printerPort = document.getElementById('printerPort').value;
    const printerDPI = document.getElementById('printerDPI').value;
    const workcenter = document.getElementById('workcenter').value;
    const response = await fetch('http://localhost:5000/printers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    console.log("data",data);
    //set form fields to empty
    document.getElementById('printerName').value = '';
    document.getElementById('printerIP').value = '';
    document.getElementById('printerPort').value = '';
    document.getElementById('printerDPI').value = '';
  };

  const handleDelete = async id => {
    console.log(id);
    const response = await fetch(`http://localhost:5000/printers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

  };

  return (
    <div margin="auto">
      <Box>
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
            <Select type="text" placeholder="Workcenter">

              {workcenters?.map((workcenter, index) => (
                <option key={workcenter + index} value={workcenter}>
                  {workcenter}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button colorScheme="blue" size="sm" onClick={handleAdd}>
            Dodaj
          </Button>
        </SimpleGrid>
      </Box>
      <h1>Drukarki</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>ERROR {JSON.stringify(errorMessage)}</div>}
      {!isLoading && !isError && (
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
            {printers?.map(printer => (
              <Tr key={printer.printerID}>
                <Td>{printer.printerName}</Td>
                <Td>{printer.printerIP}</Td>
                <Td>{printer.printerPort}</Td>
                <Td>{printer.printerDPI}</Td>
                <Td>{printer.workcenter}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(printer.printerID)}
                  >
                    X
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      )}
    </div>
  );
}

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function WorkcenterUI(
  {
    workcenters,
    printableLabels,
    isLoading,
    isError,
    errorMessage,
  }
) {

  const addWorkcenter = async workcenter => {
    console.log('workcenter', workcenter);
    console.log('labels', printableLabels);

    const labels = printableLabels.filter(label => label.isChecked);

    const labelsArray = labels?.map(label => label.label);
    console.log('labelsArray', labelsArray);
    const response = await fetch('http://localhost:5000/workcenters', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        workcenter: workcenter,
        printableLabels: labelsArray,
      }),
    });
    console.log('response', response);


    document.getElementById('WC').value = '';
  };

  const handleCheck = e => {
    const label = e.target.value;
    const isChecked = e.target.checked;
    const newPrintableLabels = printableLabels.map(labelObj => {
      if (labelObj.label === label) {
        labelObj.isChecked = !labelObj.isChecked;
      }
      return labelObj;
    });
    setPrintableLabels(newPrintableLabels);
    console.log(printableLabels);
  };

  const deleteWorkcenter = async workcenterID => {
    const response = await fetch(
      'http://localhost:5000/workcenters/ ' + workcenterID,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    fetchWorkcenters();
    fetchLabels();
  };



  return (
    <Box>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{errorMessage}</div>}
      {!isLoading && !isError && (


      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Workcenter</Th>
              <Th>Labels</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workcenters?.map((workcenter, index) => (
              <Tr key={index}>
                <Td>{workcenter.workcenter}</Td>
                <Td>
                  <ol>
                    {workcenter?.printableLabels?.map((label, index) => (
                      <li key={index}>{label}</li>
                    ))}
                  </ol>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    variant="outline"
                    onClick={() => deleteWorkcenter(workcenter.workcenterID)}
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

      <Box borderTop="1px solid #BBBBBB">
        <FormControl id="WC">
          <FormLabel>Dodaj nowy workcenter</FormLabel>
          <Input type="text" placeholder="Workcenter" />
        </FormControl>
        <FormControl id="labels">
          <FormLabel>Etykiety</FormLabel>
          <CheckboxGroup>
            <Stack>
              {printableLabels.map((label, index) => (
                <Checkbox
                  key={index}
                  value={label.label}
                  onChange={handleCheck}
                >
                  {label.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button
          onClick={() => addWorkcenter(document.getElementById('WC').value)}
          colorScheme="blue"
          size="sm"
          //variant="outline"
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}

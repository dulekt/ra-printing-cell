import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import server_data from '@/data/server_data';

const { ip, port } = server_data();

export default function WorkcenterUI({ workcenters, labels, isLoading, isError, errorMessage }) {
    const addWorkcenter = async workcenter => {
        console.log('workcenter', workcenter);

        console.log('labels', labels);

        const checkedLabels = labels?.filter(label => label.isChecked);

        const labelsArray = checkedLabels?.map(label => label.label);
        console.log('labelsArray', labelsArray);

        const response = await fetch(
            `http://${ip}:${port}/workcenters`,

            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    workcenter,
                    printableLabels: printables,
                }),
            }
        );

        console.log('response', response);

        document.getElementById('WC').value = '';
    };

    const [printables, setPrintables] = useState([]);
    const handleCheck = e => {
        const label = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setPrintables([...printables, label]);
        } else {
            const newPrintableLabels = printables.filter(printableLabel => printableLabel !== label);
            setPrintables(newPrintableLabels);
        }
    };

    console.log('printables:', printables);

    const deleteWorkcenter = async workcenterID => {
        const response = await fetch(`http://${ip}:${port}/workcenters/${workcenterID}`, {
            method: 'DELETE',
        });
    };

    return (
        <Box>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{errorMessage}</div>}
            {!isLoading && !isError && !workcenters.length && <div>Brak workcenterów</div>}
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
                            {workcenters.map((workcenter, index) => (
                                <Tr key={index}>
                                    <Td>{workcenter.workcenter}</Td>
                                    <Td>
                                        <ol>
                                            {workcenter?.printableLabels?.map((label, index2) => (
                                                <li key={index2}>{label}</li>
                                            ))}
                                            {workcenter.printableLabels.length === 0 && <div>Brak etykiet</div>}
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
                            {!labels && <div>Brak etykiet w systemie </div>}
                            {labels?.map((label, index) => (
                                <Checkbox key={index} value={label.label} onChange={handleCheck}>
                                    {label.label}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </FormControl>
                <Button onClick={() => addWorkcenter(document.getElementById('WC').value)} colorScheme="blue" size="sm">
                    Dodaj
                </Button>
            </Box>
        </Box>
    );
}

import {
    Box,
    Button,
    FormControl,
    Input,
    Select,
    SimpleGrid,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import server_data from '@/data/server_data';

const { ip, port } = server_data();

export default function PrinterUI({ printers, workcenters, isLoading, isError, errorMessage }) {
    const handleAdd = async e => {
        const name = document.getElementById('printerName').value;
        const printerIP = document.getElementById('printerIP').value;
        const printerPort = document.getElementById('printerPort').value;
        const printerDPI = document.getElementById('printerDPI').value;
        const workcenter = document.getElementById('workcenter').value;
        const response = await fetch(`http://${ip}:${port}/printers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                printerName: name,
                printerIP,
                printerPort,
                printerDPI,
                workcenter,
            }),
        });

        const data = await response.json();
        console.log('data', data);

        // set form fields to empty
        document.getElementById('printerName').value = '';

        document.getElementById('printerIP').value = '';

        document.getElementById('printerPort').value = '';

        document.getElementById('printerDPI').value = '';
    };

    const handleDelete = async id => {
        console.log(id);

        const response = await fetch(`http://${ip}:${port}/printers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
    };

    return (
        <div>
            {workcenters.length > 0 ? (
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
                                    <option key={index} value={workcenter.workcenter}>
                                        {workcenter.workcenter}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button colorScheme="blue" size="sm" onClick={handleAdd}>
                            Dodaj
                        </Button>
                    </SimpleGrid>
                </Box>
            ) : (
                <Text color="red.500" fontWeight="bold" fontSize="l">
                    Najpierw dodaj przynajmniej jeden Workcenter{' '}
                </Text>
            )}
            <h1>Drukarki</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>ERROR {JSON.stringify(errorMessage)}</div>}
            {!isLoading && !isError && printers.length > 0 && (
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

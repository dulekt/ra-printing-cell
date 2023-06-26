import {
    Box,
    Button,
    Center,
    FormControl,
    Input,
    Select,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import server_data from '@/data/server_data';

const { ip, port } = server_data();

export default function LabelUI({ labels, printers, isLoading, isError, errorMessage }) {
    const handleAdd = async e => {
        const label = document.getElementById('label').value;
        const label_width = document.getElementById('label_width').value;
        const label_height = document.getElementById('label_height').value;
        const ribbonWidth = document.getElementById('ribbon_width').value;
        const label_x0 = document.getElementById('label_x0').value;
        const font_size = document.getElementById('font_size').value;
        const labels_in_row = document.getElementById('labels_in_row').value;
        const print_cell_printer = document.getElementById('print_cell_printer').value;

        const lines_of_text = document.getElementById('lines_of_text').value;

        const response = await fetch(`http://${ip}:${port}/labels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label,
                label_width,
                label_height,
                ribbon_width: ribbonWidth,
                label_x0,
                font_size,
                labels_in_row,
                print_cell_printer,
                lines_of_text,
            }),
        });
    };

    const handleDelete = async id => {
        console.log('id: ', id);

        const response = await fetch(`http://${ip}:${port}/labels/${id}`, {
            method: 'DELETE',
        });
    };

    return (
        <Box p={2}>
            {printers.length > 0 ? (
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
                                {printers.map(printer => (
                                    <option key={printer.printerID}>{printer.printerName}</option>
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
            ) : (
                <Text fontSize="l" fontWeight="bold" color="red.500">
                    Najpierw przypiś przynajmniej jedną drukarkę celki!
                </Text>
            )}

            {isLoading && <Text>Ładowanie...</Text>}
            {isError && <Text>Błąd: {errorMessage}</Text>}
            {!isLoading && !isError && labels.length > 0 && (
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
                                {labels.map(label => (
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
            )}
        </Box>
    );
}

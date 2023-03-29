import { useEffect } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useClipboard,
    useDisclosure,
} from '@chakra-ui/react';
import { json2csv } from 'json-2-csv';

import server_data from '@/data/server_data';

const { ip, port } = server_data();
function handlePrint(id) {
    const sendPrintRequest = async id => {
        const response = await fetch(`http://${ip}:${port}/print_cell/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('id', id, 'data', data);
    };

    sendPrintRequest(id);
}

export default function Modal_Plastic({ order, fetchOrders }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function countValues(list) {
        const counts = {};
        list.forEach(x => {
            counts[x] = (counts[x] || 0) + 1;
        });

        return counts;
    }

    function handleClick(id) {
        handlePrint(id);

        fetchOrders();
    }

    const valueCounts = countValues(order.content);
    const grupa = `${order.id} l ${order.user} l ${order.workcenter}`;
    const nosnik = order.labelType.split('-')[0];
    const { onCopy, setValue, hasCopied } = useClipboard('');
    async function prepareCopyData() {
        const data = Object.entries(valueCounts).map(([value, count]) => ({
            Grupa: grupa,
            Tresc: value,
            Ilosc: count,
            Nosnik: nosnik,
        }));

        const csv = await json2csv(data);
        const tabDelimited = csv.replaceAll(',', '	');
        setValue(tabDelimited);
    }

    async function handleCopy() {
        await prepareCopyData();

        onCopy();
    }

    return (
        <>
            <Button colorScheme="red" size="sm" onClick={onOpen} variant={order.isPrinted ? 'outline' : 'solid'}>
                Pulsar
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="30%" backdropBlur="5px" />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Grupa</Th>
                                    <Th>Tresc</Th>
                                    <Th>Ilość</Th>
                                    <Th>Nosnik</Th>
                                </Tr>
                            </Thead>
                            <Tbody id="pulsar-table">
                                {Object.entries(valueCounts).map(([value, count]) => (
                                    <Tr key={value + count}>
                                        <Td>{grupa}</Td>
                                        <Td>{value}</Td>
                                        <Td>{count}</Td>
                                        <Td>{nosnik}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            variant="outline"
                            size="sm"
                            onClick={() => handleClick(order.id)}
                        >
                            Wykonane
                        </Button>
                        {
                            // todo implement in the future copy to clipboard
                            <Button
                                colorScheme={hasCopied ? 'green' : 'blue'}
                                mr={3}
                                variant="outline"
                                size="sm"
                                tooltip="Copy to clipboard"
                                onClick={handleCopy}
                            >
                                {hasCopied ? 'Skopiowane!' : 'Kopiuj do schowka'}
                            </Button>
                        }
                        <Button colorScheme="blue" mr={3} size="sm" onClick={onClose}>
                            Zamknij
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

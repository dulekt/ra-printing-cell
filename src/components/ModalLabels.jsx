import { useCallback, useMemo } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
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

const handlePrint = async id => {
    const response = await fetch(`http://${ip}:${port}/print_cell/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log('id', id, 'data', data);
};

const countValues = list => {
    const counts = {};

    list.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });

    return counts;
};

export default function ModalPlastic({ order, fetchOrders }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onCopy, setValue, hasCopied } = useClipboard('', 500);
    const { content, user, labelType, workcenter } = order;

    const handleClick = async id => {
        await handlePrint(id);

        await fetchOrders();
    };

    const { valueCounts, grupa, nosnik } = useMemo(
        () => ({
            valueCounts: countValues(order.content),
            grupa: `${order.id} l ${order.user} l ${order.workcenter}`,
            nosnik: order.labelType.split('-')[0],
        }),
        [order]
    );

    const handleCopy = useCallback(async () => {
        const data = Object.entries(valueCounts).map(([value, count]) => ({
            Grupa: grupa,
            Tresc: value,
            Ilosc: count,
            Nosnik: nosnik,
        }));

        const csv = await json2csv(data, {
            delimiter: {
                field: '	',
            },
        });

        setValue(csv);

        onCopy();
    }, [valueCounts, grupa, nosnik]);

    return (
        <>
            <Button colorScheme="blue" size="sm" onClick={onOpen} variant={order.isPrinted ? 'outline' : 'solid'}>
                Pokaż
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="30%" backdropBlur="5px" />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalHeader>
                            {user} : {labelType} : {workcenter}
                        </ModalHeader>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Tresc</Th>
                                </Tr>
                            </Thead>
                            <Tbody id="label-table">
                                {content.map((value, index) => (
                                    <Tr key={index}>
                                        <Td>{value}</Td>
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
                            Drukuj
                        </Button>
                        {
                            <Button
                                colorScheme={hasCopied ? 'green' : 'blue'}
                                mr={3}
                                variant={hasCopied ? 'solid' : 'outline'}
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

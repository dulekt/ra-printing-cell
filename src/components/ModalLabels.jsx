import { useCallback, useMemo } from 'react';
import { CSVLink } from 'react-csv';
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

export default function ModalPlastic({ order, fetchOrders }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { content, user, labelType, workcenter } = order;

    const handleClick = async id => {
        await handlePrint(id);

        await fetchOrders();
    };

    const getArray = array => {
        const newArray = [];
        array.forEach(element => {
            newArray.push([`${element} `]);
        });

        return newArray;
    };

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
                        <Button colorScheme="green" variant="outline" mr={3} size="sm">
                            <CSVLink data={getArray(order.content)}>Sćiągnij Excel</CSVLink>{' '}
                        </Button>
                        <Button colorScheme="blue" mr={3} size="sm" onClick={onClose}>
                            Zamknij
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

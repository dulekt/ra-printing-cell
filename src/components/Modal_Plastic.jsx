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
    useDisclosure,
} from '@chakra-ui/react';

export default function Modal_Plastic({ order }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function countValues(list) {
        const counts = {};
        list.forEach(x => {
            counts[x] = (counts[x] || 0) + 1;
        });

        return counts;
    }

    const valueCounts = countValues(order.content);
    const grupa = `${order.id}|${order.user}|${order.workcenter}`;
    const nosnik = order.labelType;

    return (
        <>
            <Button colorScheme="green" size="sm" onClick={onOpen} variant={order.isPrinted ? 'outline' : 'solid'}>
                Grawerka
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
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
                            <Tbody>
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
                        {
                            // todo copy to clipboard secondary action
                            // todo mark in db as printed true
                        }
                        <Button colorScheme="red" mr={3} variant="outline" size="sm" tooltip="Copy to clipboard">
                            Copy to clipboard
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

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

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

export default function ModalSpecialOrders({ order, fetchOrders }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const description = order?.description;
    const nosnik = order?.labelType;
    function handleClick(id) {
        handlePrint(id);

        fetchOrders();
    }

    return (
        <>
            <Button
                colorScheme={order.order_type === 'Grawerki' ? 'green' : 'purple'}
                size="sm"
                onClick={onOpen}
                variant={order.isPrinted ? 'outline' : 'solid'}
            >
                {order.order_type === 'Grawerki' ? 'Grawerki' : 'Wydruki'}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="30%" backdropBlur="5px" />
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize="m" color="gray.900">
                            {nosnik}
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                            {` ${order.workcenter}: ${order.user} (Nr. zlecenia: ${order.order_number})`}
                        </Text>
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="m" color="gray.900">
                            OPIS:
                        </Text>
                        <Text fontSize="m" color="gray.900">
                            {description}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        {
                            // todo mark in db as printed true
                        }
                        <Button
                            colorScheme="red"
                            mr={3}
                            variant="outline"
                            size="sm"
                            onClick={() => handleClick(order.id)}
                        >
                            Wykonane
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

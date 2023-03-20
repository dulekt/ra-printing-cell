import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

export default function ModalSpecialOrders({ order }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const description = order?.description;

    // const grupa = `${order.id}|${order.user}|${order.workcenter}`;
    const nosnik = order?.labelType;

    return (
        <>
            <Button colorScheme="red" size="sm" onClick={onOpen} variant={order.isPrinted ? 'outline' : 'solid'}>
                Special
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{nosnik}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{description}</ModalBody>
                    <ModalFooter>
                        {
                            // todo mark in db as printed true
                        }
                        <Button colorScheme="red" mr={3} variant="outline" size="sm" tooltip="Copy to clipboard">
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

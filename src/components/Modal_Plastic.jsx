import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

export default function Modal_Plastic(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const order = props.order;
  //function takes a list of values and returns object list elements as keys and values as count

  function countValues(list) {
    const counts = {};
    list.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }
  const valueCounts = countValues(order.content);
  const grupa = order.id + '|' + order.user + '|' + order.workcenter;
  const nosnik = order.labelType;
  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        Grawerka
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {
              //todo  order.order_type="Oznaczenia plastikowe"  grupa=order.id, _|_ tresc=order.order_type_|_ilosc=order.quantity_|_nosnik=order.nosnik
              //todo  order.order_type="Naklejki"              header(order.user,order.workcenter) body(order.labelType------order.description)
            }

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
                  <Tr>
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
              //todo copy to clipboard secondary action
              //todo mark in db as printed true
            }
            <Button
              colorScheme="red"
              mr={3}
              variant="outline"
              size="sm"
              tooltip="Copy to clipboard"
            >
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

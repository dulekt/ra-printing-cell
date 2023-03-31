import { Button, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import ModalLabels from './ModalLabels';
import ModalSpecialOrders from './ModalSpecialOrders';
import ModalPlastic from '@/components/ModalPlastic';
import server_data from '@/data/server_data';

const { ip, port } = server_data();
function handlePrint(id) {
    console.log(id);

    const sendPrintRequest = async id => {
        const response = await fetch(`http://${ip}:${port}/print_cell/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
    };

    sendPrintRequest(id);
}

function getDate(datetime) {
    const fullDate = datetime?.split('T')[0];

    const reverseDate = fullDate?.split('-')?.reverse();
    const DD = reverseDate[0];
    const MM = reverseDate[1];
    const date = `${DD}/${MM}`;

    return date;
}

function getTime(datetime) {
    const time = datetime?.split('T')[1].split('.')[0];
    const HH = time?.split(':')[0];
    const MM = time?.split(':')[1];
    const HHMM = `${HH}:${MM}`;

    return HHMM;
}

export default function OrderTable({ orders, fetchOrders }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function handleClick(id) {
        handlePrint(id);

        fetchOrders();
    }

    return (
        <div>
            {orders?.length === 0 && (
                <Text fontSize="xl" fontWeight="bold" color="red.400">
                    Brak zamówień
                </Text>
            )}

            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Time</Th>
                        <Th>Order type</Th>
                        <Th>Imie</Th>
                        <Th>Stanowisko</Th>
                        <Th>Print</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders?.map(order => (
                        <Tr key={order.id}>
                            <Td>{getDate(order?.datetime)}</Td>
                            <Td>{getTime(order?.datetime)}</Td>
                            <Td>
                                {`${order?.order_type}`}{' '}
                                {order?.order_type === 'Naklejki' ? `${order?.labelType}` : ` `}
                            </Td>
                            <Td>{order?.user}</Td>
                            <Td>{order?.workcenter}</Td>
                            <Td>
                                {(() => {
                                    switch (order?.order_type) {
                                        case 'Naklejki':
                                            return <ModalLabels order={order} fetchOrders={fetchOrders} />;

                                        case 'Oznaczenia plastikowe':
                                            return <ModalPlastic order={order} fetchOrders={fetchOrders} />;

                                        default:
                                            return <ModalSpecialOrders order={order} fetchOrders={fetchOrders} />;
                                    }
                                })()}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
}

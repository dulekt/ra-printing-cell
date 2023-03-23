import { useEffect, useState } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Container, Text } from '@chakra-ui/react';

import OrderTable from '@/components/OrderTable';
import Settings from '@/components/Settings';
import server_data from '@/data/server_data';

const { ip, port } = server_data();

export default function AppContent() {
    // define state for orders
    const [orders, setOrders] = useState([]);
    const [settingsOn, setSettingsOn] = useState(false);
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    // fetch orders from server every 5 seconds
    const fetchOrders = async () => {
        const response = await fetch(`http://${ip}:${port}/orders`);
        const data = await response.json();
        setOrders(data);

        setOrdersLoaded(true);
    };

    useEffect(() => {
        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const newOrders = [];
    const oldOrders = [];
    try {
        orders.forEach(order => {
            if (order.isPrinted === false) {
                newOrders.push(order);
            } else {
                oldOrders.push(order);
            }
        });
    } catch (e) {
        console.log(e);
    }

    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <div>
            <Button
                colorScheme={settingsOn ? 'red' : 'blue'}
                aria-label="Settings"
                variant={settingsOn ? 'solid' : 'outline'}
                onClick={() => setSettingsOn(!settingsOn)}
                leftIcon={<SettingsIcon />}
            >
                Settings
            </Button>

            {ordersLoaded && (
                <Container>
                    {settingsOn && <Settings />}
                    {!settingsOn && (
                        <div>
                            {newOrders.length === 0 && (
                                <Text fontSize="l" fontWeight="bold" color="green.500">
                                    {' '}
                                    Brak nowych zamówień
                                </Text>
                            )}
                            {newOrders.length > 0 && <OrderTable orders={newOrders} fetchOrders={fetchOrders} />}

                            {oldOrders.length > 0 && (
                                <Button colorScheme="green" variant="outline" onClick={handleToggle}>
                                    {!show && 'Pokaż'}
                                    {show && 'Schowaj'} stare zamówienia
                                </Button>
                            )}
                            {show && <OrderTable orders={oldOrders} />}
                        </div>
                    )}
                </Container>
            )}
        </div>
    );
}

import { useEffect, useState } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Container } from '@chakra-ui/react';

import OrderTable from '@/components/OrderTable';
import Settings from '@/components/Settings';

export default function AppContent() {
    // define state for orders
    const [orders, setOrders] = useState([]);
    const [settingsOn, setSettingsOn] = useState(false);
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    // fetch orders from server every 5 seconds
    const fetchOrders = async () => {
        setOrdersLoaded(false);

        const response = await fetch('http://localhost:5000/orders');
        const data = await response.json();
        setOrders(data);

        setOrdersLoaded(true);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const newOrders = orders?.filter(order => order.isPrinted === false);
    const oldOrders = orders?.filter(order => order.isPrinted === true);
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
            {!ordersLoaded && <div>Loading...</div>}
            {ordersLoaded && (
                <Container>
                    {settingsOn && <Settings />}
                    {!settingsOn && (
                        <div>
                            <OrderTable orders={newOrders} fetchOrders={fetchOrders} />

                            {oldOrders.length > 0 && (
                                <Button colorScheme="green" variant="outline" onClick={handleToggle}>
                                    Pokaż stare zamówienia
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

import { useEffect, useState } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Center, Collapse, Container, IconButton, Skeleton } from '@chakra-ui/react';

import OrderTable from '@/components/OrderTable';
import Settings from '@/components/Settings';
import useData from '@/hooks/useData';
export default function AppContent() {
    const { orders, isLoading, isError, errorMessage } = useData();
    const [settingsOn, setSettingsOn] = useState(false);
    const newOrders = orders?.filter(order => order.isPrinted === false);


        const oldOrders = orders?.filter(order => order.isPrinted === true);
const [show, setShow] = useState(true);
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
            <Container>
                   {' '}

                {settingsOn && <Settings />}
                {!settingsOn && (
                    <div>
                        <OrderTable orders={newOrders}/>
                        <>
                        <Button onClick={handleToggle}> Pokaż/Schowaj </Button>

                        <Collapse isOpen = {show}>
                            this text will collapse

                        </Collapse></>
                            {
                            // todo make collapse button for old orders
                            }
                        <OrderTable orders={oldOrders} />

                    </div>
                )}
            </Container>
 </div>
    );
}

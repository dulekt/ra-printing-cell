import { useEffect, useState } from "react";
import NewOrders from "@/components/NewOrders";
import OldOrders from "@/components/OldOrders";
import Settings from "@/components/Settings";
import {
  IconButton,
  Container,
  Center,
  Collapse,
  Button,
  Skeleton,
} from "@chakra-ui/react";

import { SettingsIcon } from "@chakra-ui/icons";
export default function AppContent() {
  const [orders, setOrders] = useState([]);
  const [settingsOn, setSettingsOn] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToggle = () => setShow(!show);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:5000/orders");
    const data = await response.json();
    setOrders(Object.values(data));
  };
  const TIME_MS = 1500; //refresh time in ms

  useEffect(() => {
    setIsLoaded(false);
    fetchOrders();
    setIsLoaded(true);
    const interval = setInterval(() => {
      fetchOrders();
    }, TIME_MS);
    return () => clearInterval(interval);
  }, []);

  const newOrders = orders.filter((order) => order.isPrinted === false);
  const oldOrders = orders.filter((order) => order.isPrinted === true);

  return (
    <Skeleton isLoaded={isLoaded}>
      <Container>
        {" "}
        <Button
          colorScheme={settingsOn ? "red" : "blue"}
          aria-label="Settings"
          variant={settingsOn ? "solid" : "outline"}
          onClick={() => setSettingsOn(!settingsOn)}
          leftIcon={<SettingsIcon />}
        >
          Settings
        </Button>
        {settingsOn && <Settings />}
        {!settingsOn && (
          <div>
            <NewOrders newOrders={newOrders} fetchOrders={fetchOrders} />

            {
              //todo make collapse button for old orders
              <OldOrders oldOrders={oldOrders} />
            }
          </div>
        )}
      </Container>
    </Skeleton>
  );
}

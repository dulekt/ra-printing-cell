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
} from "@chakra-ui/react";

import { EmailIcon, SettingsIcon } from "@chakra-ui/icons";
export default function AppContent() {
  const [orders, setOrders] = useState([]);
  const [settingsOn, setSettingsOn] = useState(false);
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:5000/orders");
    const data = await response.json();
    setOrders(Object.values(data));
  };
  const TIME_MS = 10000; //refresh time in ms

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, TIME_MS);
    return () => clearInterval(interval);
  }, []);

  const newOrders = orders.filter((order) => order.isPrinted === false);
  const oldOrders = orders.filter((order) => order.isPrinted === true);

  return (
    <Container>
      {" "}
      <IconButton
        colorScheme={settingsOn ? "red" : "gray"}
        aria-label="Settings"
        variant={settingsOn ? "solid" : "outline"}
        onClick={() => setSettingsOn(!settingsOn)}
        icon={<SettingsIcon />}
      />
      {settingsOn && <Settings />}
      {!settingsOn && (
        <div>
          <NewOrders newOrders={newOrders} fetchOrders={fetchOrders} />
          <OldOrders oldOrders={oldOrders} />
          {
            //todo make collapse button for old orders
          }
        </div>
      )}
    </Container>
  );
}

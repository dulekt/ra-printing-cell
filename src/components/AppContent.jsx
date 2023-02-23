import { useEffect, useState } from "react";
import NewOrders from "@/components/NewOrders";
import OldOrders from "@/components/OldOrders";
import Settings from "@/components/Settings";
import { IconButton, Container, Center } from "@chakra-ui/react";
import { EmailIcon, SettingsIcon } from "@chakra-ui/icons";
export default function AppContent() {
  const [orders, setOrders] = useState([]);
  const [settingsOn, setSettingsOn] = useState(false);
  const fetchOrders = async () => {
    const response = await fetch("http://localhost:5000/orders");
    const data = await response.json();
    setOrders(Object.values(data));
  };
  useEffect(() => {
    fetchOrders();
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
          <NewOrders newOrders={newOrders} />
          <OldOrders oldOrders={oldOrders} />
        </div>
      )}
    </Container>
  );
}

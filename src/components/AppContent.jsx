import { useEffect, useState } from "react";
import NewOrders from "./NewOrders";
import OldOrders from "./OldOrders";
import Settings from "./Settings";
import { IconButton } from "@chakra-ui/react";
import { EmailIcon, SettingsIcon } from "@chakra-ui/icons";
//fetch data from localhost:5000/orders and set to state
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
    <>
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
    </>
  );
}

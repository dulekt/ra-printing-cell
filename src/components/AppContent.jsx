//import { testerArray, ordersFromDB } from "@/data/data";
import OrderAccordion from "@/components/OrderAccordion";
import { useEffect } from "react";
export default function AppContent() {
  //fetch data from localhost:5000/users
  const ordersFromDB = useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();
    console.log(data);
    return data;
  };

  return <OrderAccordion ordersFromDB={ordersFromDB} />;
}

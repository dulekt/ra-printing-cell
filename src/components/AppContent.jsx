import { testerArray, ordersFromDB } from "@/data/data";
import OrderAccordion from "@/components/OrderAccordion";
export default function AppContent() {
  return <OrderAccordion ordersFromDB={ordersFromDB} />;
}

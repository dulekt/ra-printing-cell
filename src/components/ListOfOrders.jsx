import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function orderCompopnents({ orders }) {
  return (
    <Box>
      <Box>
        {orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </Box>
    </Box>
  );
}

export default function ListOfOrders(props) {
  const ordersFromDB = props.ordersFromDB;
  return (
    <Box>
      <Box>Panel Zamówień</Box>
      {orderCompopnents(ordersFromDB)}
    </Box>
  );
}

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Checkbox,
  Stack,
  Icon,
} from "@chakra-ui/react";
import OrderPanel from "./OrderPanel";
function ListOrders({ orders }) {
  return (
    <Box>
      <Box>Panel Zamówień</Box>
      <Accordion allowToggle>
        {orders
          .sort((a, b) => {
            if (a.isPrinted === b.isPrinted) {
              return a.date > b.date ? 1 : -1;
            } else {
              return a.isPrinted ? 1 : -1;
            }
          })
          .map((order) => (
            <AccordionItem key={order.id}>
              <AccordionButton
                color={order.isPrinted ? "gray.400" : "black"}
                border="1px"
              >
                <Icon viewBox="0 0 200 200">
                  <path
                    fill={order.orderType === "Naklejki" ? "green" : "blue"}
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <Box flex="1" textAlign="left" border>
                  {order.time} {order.login} {order.labelType}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <OrderPanel order={order} />
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Box>
  );
}

export default function OrderAccordion(props) {
  const ordersFromDB = props.ordersFromDB;
  return (
    <Box>
      <ListOrders orders={ordersFromDB} />
    </Box>
  );
}

import {
  Stack,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Checkbox,
  Text,
} from "@chakra-ui/react";
export default function OrderPanel(props) {
  const order = props.order;

  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {order.orderType}
            {": "}
            {order.labelType}
          </Heading>
          <Text>{order.description} </Text>
          {order.content.map((element) => (
            <Text color="blue.600" fontSize="2xl">
              {element.text}
              {": "}
              {element.ammount}
            </Text>
          ))}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Drukuj
          </Button>
          <Checkbox
            size="md"
            colorScheme="blue"
            color={"blue.400"}
            isChecked={order.isPrinted}
            onChange={(e) => {
              handleTogglePrinted(e, order);
            }}
          >
            Wydrukowane?
          </Checkbox>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

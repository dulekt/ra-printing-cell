import { Box } from "@chakra-ui/react";

export default function OrderCard(props) {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  const order = props.order;
  return (
    <>
      <Button variantColor="blue" onClick={handleToggle}>
        Toggle
      </Button>
      <Collapse mt={4} isOpen={show}>
        <p>it works</p>
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </Collapse>
    </>
  );
}

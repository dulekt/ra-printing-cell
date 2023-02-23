import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Input,
  Box,
  Text,
  Center,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
//todo add checklist to select printable labels for workcenter
export default function WorkcenterUI() {
  const [workcenters, setWorkcenters] = useState([]);
  const [printableLabels, setPrintableLabels] = useState([]);

  const fetchWorkcenters = async () => {
    const response = await fetch("http://localhost:5000/workcenters");
    const data = await response.json();
    setWorkcenters(Object.values(data));
  };

  const fetchLabels = async () => {
    const response = await fetch("http://localhost:5000/labels");
    const data = await response.json();
    console.log("data", data);
    const dataValues = Object.values(data);
    dataValues.map((label, index) =>
      console.log("label " + index, label.label)
    );

    //set labels to an array of label names for use in checklist with default values of false
    const labelArray = dataValues.map((label) => ({
      label: label.label,
      isChecked: false,
    }));
    setPrintableLabels(labelArray);
  };

  useEffect(() => {
    fetchWorkcenters();
    fetchLabels();
  }, []);
  const handleCheck = (e) => {
    console.log("e", e);
    const label = e.target.value;
    const isChecked = e.target.checked;
    console.log("label", label);
    console.log("isChecked", isChecked);
    //set the isChecked value of the label to the opposite of its current value
    const newPrintableLabels = printableLabels.map((labelObj) => {
      if (labelObj.label === label) {
        labelObj.isChecked = !labelObj.isChecked;
      }
      return labelObj;
    });
    setPrintableLabels(newPrintableLabels);
    console.log("newPrintableLabels", newPrintableLabels);
  };

  return (
    //a checklist stack of labels to select for each workcenter that adds to the array of printable labels
    <Box>
      <SimpleGrid columns={2} spacing={10}>
        <FormControl id="workcenter">
          <FormLabel>Workcenter</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="printableLabels">
          <FormLabel>Printable Labels</FormLabel>
          <Stack spacing={1}>
            <CheckboxGroup colorScheme="green">
              {printableLabels.map((label) => (
                <Checkbox value={label.label} onChange={handleCheck}>
                  {label.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Stack>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
}

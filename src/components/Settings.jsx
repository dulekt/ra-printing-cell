import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Center,
} from "@chakra-ui/react";
import UserUI from "@/components/UserUI";
import LabelUI from "@/components/LabelUI";
import PrinterUI from "@/components/PrinterUI";
export default function Settings() {
  //state for switching between labelUI, UserUI, printersUI

  return (
    <Container centerContent>
      <Center>
        <Tabs align="center">
          <TabList>
            <Tab>Użytkownicy</Tab>
            <Tab>Etykiety</Tab>
            <Tab>Drukarki</Tab>
          </TabList>
          <TabPanels align="center">
            <TabPanel>
              <UserUI />
            </TabPanel>
            <TabPanel>
              <LabelUI />
            </TabPanel>
            <TabPanel>
              <PrinterUI />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Container>
  );
}

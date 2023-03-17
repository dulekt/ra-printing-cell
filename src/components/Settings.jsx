import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import useData from '@/hooks/useData';
import UserUI from '@/components/UserUI';
import LabelUI from '@/components/LabelUI';
import PrinterUI from '@/components/PrinterUI';
import WorkcenterUI from '@/components/WorkcenterUI';
import { jsx } from '@emotion/react';
export default function Settings() {
  const { printers,
    labels,
    workcenters,
    users,
    isLoading,
    isError,
    errorMessage } = useData();
  return (
    <Container centerContent>
      <Skeleton isLoaded={!isLoading && isError}>
        <Center>
          <Tabs align="center">
            <TabList>
              <Tab>Użytkownicy</Tab>
              <Tab>Etykiety</Tab>
              <Tab>Drukarki</Tab>
              <Tab>Workcenters</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserUI 
                users = {users}
                isLoading = {isLoading}
                isError = {isError}
                errorMessage = {errorMessage}
                />
              </TabPanel>
              <TabPanel>
                <LabelUI 
                labels = {labels}
                printers = {printers}
                isLoading = {isLoading}
                isError = {isError}
                errorMessage = {errorMessage}

                />
              </TabPanel>
              <TabPanel>
                <PrinterUI 
                printers = {printers}
                workcenters = {workcenters}
              
                isLoading = {isLoading}
                isError = {isError}
                errorMessage = {errorMessage}
                />
              </TabPanel>
              <TabPanel>
                <WorkcenterUI 
                workcenters = {workcenters}
                printableLabels = {labels}
                                isLoading = {isLoading}
                isError = {isError}
                errorMessage = {errorMessage}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Skeleton>
      <div>{isError && JSON.stringify(errorMessage)}</div>
    </Container>
  );
}

import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import LabelUI from '@/components/LabelUI';
import PrinterUI from '@/components/PrinterUI';
import UserUI from '@/components/UserUI';
import WorkcenterUI from '@/components/WorkcenterUI';
import useData from '@/hooks/useData';

export default function Settings() {
    const { printers, labels, workcenters, users, isLoading, isError, errorMessage } = useData();

    return (
        <Container centerContent>
            <div>{isLoading && 'Loading...'}</div>

            <Center>
                <Tabs align="center">
                    <TabList>
                        <Tab>Użytkownicy</Tab>
                        <Tab>Workcenters</Tab>
                        <Tab>Etykiety</Tab>
                        <Tab>Drukarki</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <UserUI users={users} isLoading={isLoading} isError={isError} errorMessage={errorMessage} />
                        </TabPanel>{' '}
                        <TabPanel>
                            <WorkcenterUI
                                workcenters={workcenters}
                                labels={labels}
                                isLoading={isLoading}
                                isError={isError}
                                errorMessage={errorMessage}
                            />
                        </TabPanel>
                        <TabPanel>
                            <LabelUI
                                labels={labels}
                                printers={printers}
                                isLoading={isLoading}
                                isError={isError}
                                errorMessage={errorMessage}
                            />
                        </TabPanel>
                        <TabPanel>
                            <PrinterUI
                                printers={printers}
                                workcenters={workcenters}
                                isLoading={isLoading}
                                isError={isError}
                                errorMessage={errorMessage}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>

            <div>{isError && JSON.stringify(errorMessage)}</div>
        </Container>
    );
}

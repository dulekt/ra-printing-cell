// import "App.css";
import { ChakraProvider, Container } from '@chakra-ui/react';

import '@/App.css';
import AppContent from '@/components/AppContent';
import AppFooter from '@/components/AppFooter';
import AppHeader from '@/components/AppHeader';

function App() {
    return (
        <ChakraProvider>
            <Container>
                <AppHeader />
                <AppContent />
                <AppFooter />
            </Container>
        </ChakraProvider>
    );
}

export default App;

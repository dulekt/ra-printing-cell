//import "App.css";
import { Container, ChakraProvider } from "@chakra-ui/react";
import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";
import AppFooter from "@/components/AppFooter";
import "@/App.css";
function App() {
  return (
    <ChakraProvider>
      <Container centerContent>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Container>
    </ChakraProvider>
  );
}

export default App;

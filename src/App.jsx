//import "App.css";
import { Container, ChakraProvider } from "@chakra-ui/react";
import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";
import AppFooter from "@/components/AppFooter";
import "@/App.css";
function App() {
  return (
    <ChakraProvider centerContent>
      <Container centerContent border={"solid red"}>
        <AppHeader centerContent />
        <AppContent centerContent />
        <AppFooter centerContent />
      </Container>
    </ChakraProvider>
  );
}

export default App;

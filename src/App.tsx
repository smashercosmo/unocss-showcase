import "./App.css";
import { Box } from "./components/Box";

export function App() {
  return (
    <Box
      padding-inline="xs"
      padding-block="xs"
      margin-inline="xs"
      margin-block="xs"
      md:padding-inline="md"
      md:padding-block="md"
      md:margin-inline="md"
      md:margin-block="md"
      block-size="3rem"
      inline-size="3rem"
      md:block-size="5.5rem"
      md:inline-size="5.5rem"
      position="absolute"
      inset="1rem"
      flex="none"
      color="info-surface"
      border-color="info-dark"
      background-color="info-main"
      border-width={1}
      border-radius="md"
      align-self="center"
    >
      Hello
    </Box>
  );
}

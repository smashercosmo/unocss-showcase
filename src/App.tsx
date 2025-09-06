import { Box } from "./components/Box";

export function App() {
  return (
    <Box display="grid" grid-template-columns="1fr" md:grid-template-columns="1fr 1fr" gap="sm">
      <Box display="grid" grid-column="1/-1" grid-template-columns="subgrid">
        <Box background-color="success-main">Hello</Box>
        <Box background-color="warning-light">Hello</Box>
      </Box>
      <Box display="grid" grid-column="1/-1" grid-template-columns="subgrid">
        <Box background-color="success-main">Hello</Box>
        <Box background-color="warning-light">Hello</Box>
      </Box>
    </Box>
  );
}

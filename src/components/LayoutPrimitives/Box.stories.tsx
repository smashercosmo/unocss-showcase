import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Box } from "./Box";

const meta = {
  title: "Box",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <Box
      display="grid"
      gridTemplateColumns="200px minmax(900px, 1fr) 100px"
      gridTemplateRows="repeat(10, 18rem)"
      gridColumn="1 / -1"
      gridRow="span 2"
      paddingInline="xs"
      paddingBlock="xs"
      marginInline="xs"
      marginBlock="xs"
      md:paddingInline="md"
      md:paddingBlock="md"
      md:marginInline="md"
      md:marginBlock="md"
      blockSize="3rem"
      inlineSize="3rem"
      md:blockSize="5.5rem"
      md:inlineSize="5.5rem"
      position="absolute"
      inset="1rem"
      flex="none"
      color="info-surface"
      borderColor="info-dark"
      backgroundColor="info-main"
      borderRadius="md"
      alignSelf="center"
    >
      Hello
    </Box>
  ),
};

export const FlexBox: Story = {
  render: () => (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      columnGap="xl"
      rowGap="xl"
      inlineSize="100vw"
      backgroundColor="grey-300"
      color="white"
      padding="lg"
    >
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
      <Box padding="sm" inlineSize={300} backgroundColor="grey-600">
        Hello
      </Box>
    </Box>
  ),
};

export const DefaultBorders: Story = {
  render: () => (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      columnGap="xl"
      rowGap="xl"
      inlineSize="100vw"
      backgroundColor="grey-300"
      padding="lg"
    >
      <Box borderColor="success-main" padding="sm" inlineSize={300}>
        Hello
      </Box>
      <Box borderColor="success-main" padding="sm" inlineSize={300}>
        Hello
      </Box>
      <Box borderColor="success-main" padding="sm" inlineSize={300}>
        Hello
      </Box>
    </Box>
  ),
};

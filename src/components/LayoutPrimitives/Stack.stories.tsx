import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Box } from "./Box";
import { Stack } from "./Stack";

const meta = {
  title: "Stack",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack
      inline
      row
      wrap
      align="center"
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
    </Stack>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Stack
      inline
      row
      wrap
      align="center"
      columnGap="xl"
      rowGap="xl"
      inlineSize="100vw"
      backgroundColor="grey-300"
      color="white"
      padding="lg"
      asChild
    >
      <p>
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
      </p>
    </Stack>
  ),
};

export const As: Story = {
  render: () => (
    <Stack
      id="Hello"
      inline
      row
      wrap
      align="center"
      columnGap="xl"
      md:columnGap="2xl"
      rowGap="xl"
      md:rowGap="2xl"
      inlineSize="100vw"
      backgroundColor="grey-300"
      color="white"
      padding="lg"
      as="p"
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
    </Stack>
  ),
};

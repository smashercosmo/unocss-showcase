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
      grid-template-columns="200px minmax(900px, 1fr) 100px"
      grid-template-rows="repeat(10, 18rem)"
      grid-column="1 / -1"
      grid-row="span 2"
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
  ),
};

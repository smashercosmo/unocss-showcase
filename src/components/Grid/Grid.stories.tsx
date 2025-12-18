import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Grid } from "./Grid";

const meta = {
  title: "Grid",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Grid
      inline
      align="center"
      gap="xl"
      columns="200px 1fr 200px"
      rows="100px 50px"
      autoRows="100px"
      backgroundColor="grey-300"
      color="white"
      padding="lg"
    >
      <Grid row="1 / -1" column="1" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
      <Grid row="1 / -1" column="2" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
      <Grid row="1 / -1" column="3" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
    </Grid>
  ),
};

export const Areas: Story = {
  render: () => (
    <Grid
      inline
      areas='"header header" "content content" "footer footer"'
      columns="200px 2fr 200px"
      rows="100px 50px"
      autoRows="auto"
    >
      <Grid area="header" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
      <Grid area="content" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
      <Grid area="footer" padding="sm" backgroundColor="grey-600">
        Hello
      </Grid>
    </Grid>
  ),
};

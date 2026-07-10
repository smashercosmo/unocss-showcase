import preview from "@stories/preview";

import { Box } from "../Box/Box";
import { Stack } from "./Stack";

const meta = preview
  .type<{ args: { component?: keyof typeof components } }>()
  .meta({
    title: "Layout/Stack",
    component: Stack,
    argTypes: {
      inline: { control: "boolean" },
      row: { control: "boolean" },
      wrap: { control: "boolean" },
      display: { if: { arg: "inline", neq: true } },
      direction: { if: { arg: "row", neq: true } },
      flexWrap: { if: { arg: "wrap", neq: true } },
      asChild: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      inline: true,
      row: true,
      wrap: true,
      align: "center",
      columnGap: "xl",
      rowGap: "xl",
      backgroundColor: "gray-300",
      color: "white",
      padding: "lg",
    },
  });

const children = (
  <>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
    <Box padding="sm" inlineSize={300} backgroundColor="gray-600">
      Hello
    </Box>
  </>
);

export const Default = meta.story({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ asChild, ...rest }) => {
    return <Stack {...rest}>{children}</Stack>;
  },
});

const components = {
  section: <section>{children}</section>,
  main: <main>{children}</main>,
  span: <span>{children}</span>,
};

export const AsChild = meta.story({
  parameters: {
    controls: { include: ["component"] },
  },
  argTypes: {
    component: {
      control: { type: "select" },
      options: ["section", "main", "span"],
    },
  },
  args: {
    component: "section",
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ asChild, component = "section", ...rest }) => {
    return (
      <Stack {...rest} asChild>
        {components[component]}
      </Stack>
    );
  },
});

import preview from "@stories/preview";

import { Grid } from "./Grid";

const meta = preview
  .type<{ args: { component?: keyof typeof components } }>()
  .meta({
    title: "Layout/Grid",
    component: Grid,
    argTypes: {
      inline: { control: "boolean" },
      display: { if: { arg: "inline", neq: true } },
      asChild: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      inline: true,
      align: "center",
      gap: "xl",
      columns: "200px 1fr 200px",
      rows: "100px 50px",
      backgroundColor: "gray-300",
      color: "white",
      padding: "lg",
    },
  });

const children = (
  <>
    <Grid row="1 / -1" column="1" padding="sm" backgroundColor="gray-600">
      Hello
    </Grid>
    <Grid row="1 / -1" column="2" padding="sm" backgroundColor="gray-600">
      Hello
    </Grid>
    <Grid row="1 / -1" column="3" padding="sm" backgroundColor="gray-600">
      Hello
    </Grid>
  </>
);

export const Default = meta.story({
  parameters: {
    controls: { exclude: ["areas"] },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ asChild, ...rest }) => {
    return <Grid {...rest}>{children}</Grid>;
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
  render: ({ component = "section", ...rest }) => {
    return (
      <Grid {...rest} asChild>
        {components[component]}
      </Grid>
    );
  },
});

export const Areas = meta.story({
  parameters: {
    controls: { include: ["areas"] },
  },
  argTypes: {
    areas: {
      control: { type: "text" },
    },
  },
  args: {
    areas: '"header header" "content content" "footer footer"',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ asChild, ...rest }) => {
    return (
      <Grid {...rest}>
        <Grid
          area="header"
          padding="sm"
          backgroundColor="gray-600"
        >
          Header area
        </Grid>
        <Grid area="content" padding="sm" backgroundColor="gray-600">
          Content area
        </Grid>
        <Grid area="footer" padding="sm" backgroundColor="gray-600">
          Footer area
        </Grid>
      </Grid>
    );
  },
});

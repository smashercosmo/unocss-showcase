import { renderToStaticMarkup } from "react-dom/server";
import { createGenerator } from "unocss";
import { expect, it } from "vitest";

import { Box } from "@/components/LayoutPrimitives/Box";
import { Grid } from "@/components/LayoutPrimitives/Grid";
import config from "./config";
import { generateRules } from "./generateRules";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { safelist, preflights, ...configWithoutSafelistAndPreflights } = config;

it("should generate correct class names", () => {
  const output = renderToStaticMarkup(
    <Box
      padding="xs"
      margin="xs"
      paddingInline="xs"
      paddingInlineStart="xs"
      paddingInlineEnd="xs"
      paddingBlock="xs"
      paddingBlockStart="xs"
      paddingBlockEnd="xs"
      marginInline="xs"
      marginInlineStart="xs"
      marginInlineEnd="xs"
      marginBlock="xs"
      marginBlockStart="xs"
      marginBlockEnd="xs"
      md:paddingInline="md"
      md:marginBlock="md"
      blockSize="3rem"
      minBlockSize="3rem"
      maxBlockSize="3rem"
      inlineSize="3rem"
      minInlineSize="3rem"
      maxInlineSize="3rem"
      md:blockSize="5.5rem"
      md:inlineSize="5.5rem"
      borderRadius="md"
      borderColor="info-dark"
      backgroundColor="info-main"
      borderWidth={1}
      borderInlineWidth={1}
      borderInlineStartWidth={1}
      borderInlineEndWidth={1}
      position="absolute"
      inset="1rem"
      insetInline="1rem"
      insetBlockStart="1rem"
      insetBlockEnd="1rem"
      flex="none"
      color="info-surface"
      gridTemplateColumns="200px minmax(900px, 1fr) 100px"
      gridTemplateRows="repeat(10, 18rem)"
      gridColumn="1 / -1"
      gridRow="span 2"
    >
      Hello
    </Box>
  );
  expect(output).toMatchInlineSnapshot(
    `"<div class="padding-xs margin-xs padding-inline-xs padding-inline-start-xs padding-inline-end-xs padding-block-xs padding-block-start-xs padding-block-end-xs margin-inline-xs margin-inline-start-xs margin-inline-end-xs margin-block-xs margin-block-start-xs margin-block-end-xs md:padding-inline-md md:margin-block-md block-size-3rem min-block-size-3rem max-block-size-3rem inline-size-3rem min-inline-size-3rem max-inline-size-3rem md:block-size-5.5rem md:inline-size-5.5rem border-radius-md border-color-info-dark background-color-info-main border-width-1 border-inline-width-1 border-inline-start-width-1 border-inline-end-width-1 position-absolute inset-1rem inset-inline-1rem inset-block-start-1rem inset-block-end-1rem flex-none color-info-surface grid-template-columns-200px-minmax(900px,-1fr)-100px grid-template-rows-repeat(10,-18rem) grid-column-1-/--1 grid-row-span-2">Hello</div>"`
  );
});

it("should generate correct class names for shortcuts", () => {
  const output = renderToStaticMarkup(
    <Grid
      areas='"header header" "content content" "footer footer"'
      area="header"
      columns="200px 1fr 200px"
      rows="100px 50px"
      autoRows="auto"
    >
      Hello
    </Grid>
  );
  expect(output).toMatchInlineSnapshot(
    `"<div class="display-grid grid-template-areas-&quot;header-header&quot;-&quot;content-content&quot;-&quot;footer-footer&quot; grid-area-header grid-template-columns-200px-1fr-200px grid-template-rows-100px-50px grid-auto-rows-auto">Hello</div>"`
  );
});

it("should generate correct CSS", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(`
    <Box
      padding="xs"
      margin="auto"
      margin={0}
      paddingInline="xs"
      paddingInlineStart="xs"
      paddingInlineEnd="xs"
      paddingBlock="xs"
      paddingBlockStart="xs"
      paddingBlockEnd="xs"
      marginInline="xs"
      marginInlineStart="xs"
      marginInlineEnd="xs"
      marginBlock="xs"
      marginBlockStart="xs"
      marginBlockEnd="xs"
      md:paddingInline="md"
      md:marginBlock="md"
      blockSize="3rem"
      minBlockSize="3rem"
      maxBlockSize="3rem"
      inlineSize="100%"
      minInlineSize="100%"
      minInlineSize={100}
      maxInlineSize="3rem"
      md:blockSize="5.5rem"
      md:inlineSize="5.5rem"
      borderRadius="md"
      borderColor="info-dark"
      backgroundColor="info-main"
      xl:backgroundColor="info-dark"
      borderWidth={1}
      borderInlineWidth={1}
      borderInlineStartWidth={1}
      borderInlineEndWidth={1}
      position="absolute"
      inset="1rem"
      insetInline="1rem"
      insetBlockStart="1rem"
      insetBlockEnd="1rem"
      flex={1}
      flex="none"
      flexDirection="column"
      color="info-surface"
      md:color={condition ? "grey-100" : "grey-800"}
      display={layout === "contents" ? "contents" : undefined}
      overflow="hidden"
      overflowBlock="auto"
      overflowInline="visible"
    >
      Hello
    </Box>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .color-info-surface{color:var(--colors-info-surface);}
    .background-color-info-main{background-color:var(--colors-info-main);}
    .border-color-info-dark{border-color:var(--colors-info-dark);}
    .margin-0{margin:0;}
    .margin-auto{margin:auto;}
    .margin-inline-xs{margin-inline:var(--spacing-xs);}
    .margin-inline-start-xs{margin-inline-start:var(--spacing-xs);}
    .margin-inline-end-xs{margin-inline-end:var(--spacing-xs);}
    .margin-block-xs{margin-block:var(--spacing-xs);}
    .margin-block-start-xs{margin-block-start:var(--spacing-xs);}
    .margin-block-end-xs{margin-block-end:var(--spacing-xs);}
    .padding-xs{padding:var(--spacing-xs);}
    .padding-inline-xs{padding-inline:var(--spacing-xs);}
    .padding-inline-start-xs{padding-inline-start:var(--spacing-xs);}
    .padding-inline-end-xs{padding-inline-end:var(--spacing-xs);}
    .padding-block-xs{padding-block:var(--spacing-xs);}
    .padding-block-start-xs{padding-block-start:var(--spacing-xs);}
    .padding-block-end-xs{padding-block-end:var(--spacing-xs);}
    .border-radius-md{border-radius:var(--borderRadius-md);}
    .flex-direction-column{flex-direction:column;}
    .display-contents{display:contents;}
    .overflow-hidden{overflow:hidden;}
    .overflow-block-auto{overflow-y:auto;overflow-block:auto;}
    .overflow-inline-visible{overflow-x:visible;overflow-inline:visible;}
    .flex-1{flex:1;}
    .flex-none{flex:none;}
    .position-absolute{position:absolute;}
    .inline-size-100\\%{inline-size:100%;}
    .min-inline-size-100{min-inline-size:100px;}
    .min-inline-size-100\\%{min-inline-size:100%;}
    .max-inline-size-3rem{max-inline-size:3rem;}
    .block-size-3rem{block-size:3rem;}
    .min-block-size-3rem{min-block-size:3rem;}
    .max-block-size-3rem{max-block-size:3rem;}
    .inset-1rem{inset:1rem;}
    .inset-inline-1rem{inset-inline:1rem;}
    .inset-block-start-1rem{inset-block-start:1rem;}
    .inset-block-end-1rem{inset-block-end:1rem;}
    .border-width-1{border-width:1px;}
    .border-inline-width-1{border-inline-width:1px;}
    .border-inline-start-width-1{border-inline-start-width:1px;}
    .border-inline-end-width-1{border-inline-end-width:1px;}
    @media (min-width: 48em){
    .md\\:color-grey-100{color:var(--colors-grey-100);}
    .md\\:color-grey-800{color:var(--colors-grey-800);}
    .md\\:margin-block-md{margin-block:var(--spacing-md);}
    .md\\:padding-inline-md{padding-inline:var(--spacing-md);}
    .md\\:inline-size-5\\.5rem{inline-size:5.5rem;}
    .md\\:block-size-5\\.5rem{block-size:5.5rem;}
    }
    @media (min-width: 80em){
    .xl\\:background-color-info-dark{background-color:var(--colors-info-dark);}
    }"
  `);
});

it("should generate correct CSS for grid properties", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(`
    <Box>
      <div>
        <Box
          flex={1}
          display="grid"
          gridTemplateColumns={condition1 ? "200px minmax(900px, 1fr) 100px" : (condition2 || "repeat(3, 1fr)")}
          gridTemplateRows="repeat(10, 18rem)"
          gridAutoRows="1fr"
          gridColumn="1 / -1"
          gridColumn="1 / 1"
          gridRow={
            condition3 && "span 2"
          }
          color={getSpinnerColor({ variant, color })}
        >
          Hello
        </Box>
      </div>
    </Box>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .display-grid{display:grid;}
    .grid-template-columns-200px-minmax\\(900px\\,-1fr\\)-100px{grid-template-columns:200px minmax(900px, 1fr) 100px;}
    .grid-template-columns-repeat\\(3\\,-1fr\\){grid-template-columns:repeat(3, 1fr);}
    .grid-template-rows-repeat\\(10\\,-18rem\\){grid-template-rows:repeat(10, 18rem);}
    .grid-auto-rows-1fr{grid-auto-rows:1fr;}
    .grid-column-1-\\/--1{grid-column:1 / -1;}
    .grid-column-1-\\/-1{grid-column:1 / 1;}
    .grid-row-span-2{grid-row:span 2;}
    .flex-1{flex:1;}"
  `);
});

it("should generate safelist", async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preflights, ...configWithoutPreflights } = config;
  const uno = await createGenerator(configWithoutPreflights);
  const output = await uno.generate(`
    <Box>
      Hello
    </Box>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .color-bg-primary{color:var(--colors-bg-primary);}
    .color-black{color:var(--colors-black);}
    .color-brand-dark{color:var(--colors-brand-dark);}
    .color-brand-light{color:var(--colors-brand-light);}
    .color-brand-main{color:var(--colors-brand-main);}
    .color-brand-surface{color:var(--colors-brand-surface);}
    .color-currentColor{color:currentColor;}
    .color-disabled{color:var(--colors-disabled);}
    .color-divider{color:var(--colors-divider);}
    .color-error-dark{color:var(--colors-error-dark);}
    .color-error-light{color:var(--colors-error-light);}
    .color-error-main{color:var(--colors-error-main);}
    .color-error-surface{color:var(--colors-error-surface);}
    .color-grey-100{color:var(--colors-grey-100);}
    .color-grey-1000{color:var(--colors-grey-1000);}
    .color-grey-200{color:var(--colors-grey-200);}
    .color-grey-300{color:var(--colors-grey-300);}
    .color-grey-400{color:var(--colors-grey-400);}
    .color-grey-50{color:var(--colors-grey-50);}
    .color-grey-500{color:var(--colors-grey-500);}
    .color-grey-600{color:var(--colors-grey-600);}
    .color-grey-700{color:var(--colors-grey-700);}
    .color-grey-800{color:var(--colors-grey-800);}
    .color-grey-900{color:var(--colors-grey-900);}
    .color-info-dark{color:var(--colors-info-dark);}
    .color-info-light{color:var(--colors-info-light);}
    .color-info-main{color:var(--colors-info-main);}
    .color-info-surface{color:var(--colors-info-surface);}
    .color-success-dark{color:var(--colors-success-dark);}
    .color-success-light{color:var(--colors-success-light);}
    .color-success-main{color:var(--colors-success-main);}
    .color-success-surface{color:var(--colors-success-surface);}
    .color-text-primary{color:var(--colors-text-primary);}
    .color-text-secondary{color:var(--colors-text-secondary);}
    .color-transparent{color:transparent;}
    .color-warning-dark{color:var(--colors-warning-dark);}
    .color-warning-light{color:var(--colors-warning-light);}
    .color-warning-main{color:var(--colors-warning-main);}
    .color-warning-surface{color:var(--colors-warning-surface);}
    .color-white{color:var(--colors-white);}
    .background-color-bg-primary{background-color:var(--colors-bg-primary);}
    .background-color-black{background-color:var(--colors-black);}
    .background-color-brand-dark{background-color:var(--colors-brand-dark);}
    .background-color-brand-light{background-color:var(--colors-brand-light);}
    .background-color-brand-main{background-color:var(--colors-brand-main);}
    .background-color-brand-surface{background-color:var(--colors-brand-surface);}
    .background-color-currentColor{background-color:currentColor;}
    .background-color-disabled{background-color:var(--colors-disabled);}
    .background-color-divider{background-color:var(--colors-divider);}
    .background-color-error-dark{background-color:var(--colors-error-dark);}
    .background-color-error-light{background-color:var(--colors-error-light);}
    .background-color-error-main{background-color:var(--colors-error-main);}
    .background-color-error-surface{background-color:var(--colors-error-surface);}
    .background-color-grey-100{background-color:var(--colors-grey-100);}
    .background-color-grey-1000{background-color:var(--colors-grey-1000);}
    .background-color-grey-200{background-color:var(--colors-grey-200);}
    .background-color-grey-300{background-color:var(--colors-grey-300);}
    .background-color-grey-400{background-color:var(--colors-grey-400);}
    .background-color-grey-50{background-color:var(--colors-grey-50);}
    .background-color-grey-500{background-color:var(--colors-grey-500);}
    .background-color-grey-600{background-color:var(--colors-grey-600);}
    .background-color-grey-700{background-color:var(--colors-grey-700);}
    .background-color-grey-800{background-color:var(--colors-grey-800);}
    .background-color-grey-900{background-color:var(--colors-grey-900);}
    .background-color-info-dark{background-color:var(--colors-info-dark);}
    .background-color-info-light{background-color:var(--colors-info-light);}
    .background-color-info-main{background-color:var(--colors-info-main);}
    .background-color-info-surface{background-color:var(--colors-info-surface);}
    .background-color-success-dark{background-color:var(--colors-success-dark);}
    .background-color-success-light{background-color:var(--colors-success-light);}
    .background-color-success-main{background-color:var(--colors-success-main);}
    .background-color-success-surface{background-color:var(--colors-success-surface);}
    .background-color-text-primary{background-color:var(--colors-text-primary);}
    .background-color-text-secondary{background-color:var(--colors-text-secondary);}
    .background-color-transparent{background-color:transparent;}
    .background-color-warning-dark{background-color:var(--colors-warning-dark);}
    .background-color-warning-light{background-color:var(--colors-warning-light);}
    .background-color-warning-main{background-color:var(--colors-warning-main);}
    .background-color-warning-surface{background-color:var(--colors-warning-surface);}
    .background-color-white{background-color:var(--colors-white);}
    .border-color-bg-primary{border-color:var(--colors-bg-primary);}
    .border-color-black{border-color:var(--colors-black);}
    .border-color-brand-dark{border-color:var(--colors-brand-dark);}
    .border-color-brand-light{border-color:var(--colors-brand-light);}
    .border-color-brand-main{border-color:var(--colors-brand-main);}
    .border-color-brand-surface{border-color:var(--colors-brand-surface);}
    .border-color-currentColor{border-color:currentColor;}
    .border-color-disabled{border-color:var(--colors-disabled);}
    .border-color-divider{border-color:var(--colors-divider);}
    .border-color-error-dark{border-color:var(--colors-error-dark);}
    .border-color-error-light{border-color:var(--colors-error-light);}
    .border-color-error-main{border-color:var(--colors-error-main);}
    .border-color-error-surface{border-color:var(--colors-error-surface);}
    .border-color-grey-100{border-color:var(--colors-grey-100);}
    .border-color-grey-1000{border-color:var(--colors-grey-1000);}
    .border-color-grey-200{border-color:var(--colors-grey-200);}
    .border-color-grey-300{border-color:var(--colors-grey-300);}
    .border-color-grey-400{border-color:var(--colors-grey-400);}
    .border-color-grey-50{border-color:var(--colors-grey-50);}
    .border-color-grey-500{border-color:var(--colors-grey-500);}
    .border-color-grey-600{border-color:var(--colors-grey-600);}
    .border-color-grey-700{border-color:var(--colors-grey-700);}
    .border-color-grey-800{border-color:var(--colors-grey-800);}
    .border-color-grey-900{border-color:var(--colors-grey-900);}
    .border-color-info-dark{border-color:var(--colors-info-dark);}
    .border-color-info-light{border-color:var(--colors-info-light);}
    .border-color-info-main{border-color:var(--colors-info-main);}
    .border-color-info-surface{border-color:var(--colors-info-surface);}
    .border-color-success-dark{border-color:var(--colors-success-dark);}
    .border-color-success-light{border-color:var(--colors-success-light);}
    .border-color-success-main{border-color:var(--colors-success-main);}
    .border-color-success-surface{border-color:var(--colors-success-surface);}
    .border-color-text-primary{border-color:var(--colors-text-primary);}
    .border-color-text-secondary{border-color:var(--colors-text-secondary);}
    .border-color-transparent{border-color:transparent;}
    .border-color-warning-dark{border-color:var(--colors-warning-dark);}
    .border-color-warning-light{border-color:var(--colors-warning-light);}
    .border-color-warning-main{border-color:var(--colors-warning-main);}
    .border-color-warning-surface{border-color:var(--colors-warning-surface);}
    .border-color-white{border-color:var(--colors-white);}
    .gap-0{gap:0;}
    .gap-1{gap:1px;}
    .gap-2xl{gap:var(--spacing-2xl);}
    .gap-2xs{gap:var(--spacing-2xs);}
    .gap-3xl{gap:var(--spacing-3xl);}
    .gap-4xl{gap:var(--spacing-4xl);}
    .gap-5xl{gap:var(--spacing-5xl);}
    .gap-6xl{gap:var(--spacing-6xl);}
    .gap-lg{gap:var(--spacing-lg);}
    .gap-md{gap:var(--spacing-md);}
    .gap-sm{gap:var(--spacing-sm);}
    .gap-xl{gap:var(--spacing-xl);}
    .gap-xs{gap:var(--spacing-xs);}
    .row-gap-0{row-gap:0;}
    .row-gap-1{row-gap:1px;}
    .row-gap-2xl{row-gap:var(--spacing-2xl);}
    .row-gap-2xs{row-gap:var(--spacing-2xs);}
    .row-gap-3xl{row-gap:var(--spacing-3xl);}
    .row-gap-4xl{row-gap:var(--spacing-4xl);}
    .row-gap-5xl{row-gap:var(--spacing-5xl);}
    .row-gap-6xl{row-gap:var(--spacing-6xl);}
    .row-gap-lg{row-gap:var(--spacing-lg);}
    .row-gap-md{row-gap:var(--spacing-md);}
    .row-gap-sm{row-gap:var(--spacing-sm);}
    .row-gap-xl{row-gap:var(--spacing-xl);}
    .row-gap-xs{row-gap:var(--spacing-xs);}
    .column-gap-0{column-gap:0;}
    .column-gap-1{column-gap:1px;}
    .column-gap-2xl{column-gap:var(--spacing-2xl);}
    .column-gap-2xs{column-gap:var(--spacing-2xs);}
    .column-gap-3xl{column-gap:var(--spacing-3xl);}
    .column-gap-4xl{column-gap:var(--spacing-4xl);}
    .column-gap-5xl{column-gap:var(--spacing-5xl);}
    .column-gap-6xl{column-gap:var(--spacing-6xl);}
    .column-gap-lg{column-gap:var(--spacing-lg);}
    .column-gap-md{column-gap:var(--spacing-md);}
    .column-gap-sm{column-gap:var(--spacing-sm);}
    .column-gap-xl{column-gap:var(--spacing-xl);}
    .column-gap-xs{column-gap:var(--spacing-xs);}
    .flex-direction-column{flex-direction:column;}
    .flex-direction-column-reverse{flex-direction:column-reverse;}
    .flex-direction-row{flex-direction:row;}
    .flex-direction-row-reverse{flex-direction:row-reverse;}
    .display-block{display:block;}
    .display-contents{display:contents;}
    .display-flex{display:flex;}
    .display-grid{display:grid;}
    .display-inline{display:inline;}
    .display-inline-block{display:inline-block;}
    .display-inline-flex{display:inline-flex;}
    .display-inline-grid{display:inline-grid;}
    .display-none{display:none;}
    .align-items-baseline{align-items:baseline;}
    .align-items-center{align-items:center;}
    .align-items-end{align-items:end;}
    .align-items-start{align-items:start;}
    .align-items-stretch{align-items:stretch;}
    .align-self-baseline{align-self:baseline;}
    .align-self-center{align-self:center;}
    .align-self-end{align-self:end;}
    .align-self-start{align-self:start;}
    .align-self-stretch{align-self:stretch;}
    .justify-self-baseline{justify-self:baseline;}
    .justify-self-center{justify-self:center;}
    .justify-self-end{justify-self:end;}
    .justify-self-start{justify-self:start;}
    .justify-self-stretch{justify-self:stretch;}
    .justify-content-center{justify-content:center;}
    .justify-content-end{justify-content:end;}
    .justify-content-space-around{justify-content:space-around;}
    .justify-content-space-between{justify-content:space-between;}
    .justify-content-space-evenly{justify-content:space-evenly;}
    .justify-content-start{justify-content:start;}
    .justify-content-stretch{justify-content:stretch;}
    .align-content-baseline{align-content:baseline;}
    .align-content-center{align-content:center;}
    .align-content-end{align-content:end;}
    .align-content-space-around{align-content:space-around;}
    .align-content-space-between{align-content:space-between;}
    .align-content-space-evenly{align-content:space-evenly;}
    .align-content-start{align-content:start;}
    .align-content-stretch{align-content:stretch;}
    .border-style-solid{border-style:solid;}
    .border-width-0{border-width:0;}
    .border-width-1{border-width:1px;}
    .border-inline-width-0{border-inline-width:0;}
    .border-inline-width-1{border-inline-width:1px;}
    .border-inline-start-width-0{border-inline-start-width:0;}
    .border-inline-start-width-1{border-inline-start-width:1px;}
    .border-inline-end-width-0{border-inline-end-width:0;}
    .border-inline-end-width-1{border-inline-end-width:1px;}
    .border-block-width-0{border-block-width:0;}
    .border-block-width-1{border-block-width:1px;}
    .border-block-start-width-0{border-block-start-width:0;}
    .border-block-start-width-1{border-block-start-width:1px;}
    .border-block-end-width-0{border-block-end-width:0;}
    .border-block-end-width-1{border-block-end-width:1px;}"
  `);
});

it("should generate correct CSS for Stack component", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(`
    <Box>
      <div>
        <Stack
          flex={1}
          flex={2}
          flexWrap="wrap"
          flexWrap="nowrap"
        >
          Hello
        </Stack>
      </div>
    </Box>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .flex-1{flex:1;}
    .flex-2{flex:2;}
    .flex-wrap-nowrap{flex-wrap:nowrap;}
    .flex-wrap-wrap{flex-wrap:wrap;}"
  `);
});

it("should generate correct CSS for Grid component", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(`
    <Grid
      inline
      columns="200px 1fr 200px"
      rows="100px 50px"
      autoRows="auto"
    >
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
    </Grid>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .grid-template-columns-200px-1fr-200px{grid-template-columns:200px 1fr 200px;}
    .grid-template-rows-100px-50px{grid-template-rows:100px 50px;}
    .grid-auto-rows-auto{grid-auto-rows:auto;}
    .grid-column-1{grid-column:1;}
    .grid-row-1-\\/--1{grid-row:1 / -1;}"
  `);
});

it("should generate css with fallbacks", async () => {
  const uno = await createGenerator({
    ...configWithoutSafelistAndPreflights,
    rules: generateRules([
      {
        properties: [
          { name: "overflowBlock", fallback: "overflowY" },
          { name: "overflowInline", fallback: "overflowX" },
        ],
      },
    ]),
  });
  const output = await uno.generate(`
    <Grid
      overflowBlock="auto"
      overflowInline="auto"
    />
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .overflow-block-auto{overflow-y:auto;overflow-block:auto;}
    .overflow-inline-auto{overflow-x:auto;overflow-inline:auto;}"
  `);
});

it("should generate correct CSS for Grid component", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(`
    <Grid
      inline
      areas='"header header" "content content" "footer footer"'
      area="header"
      columns="200px 1fr 200px"
      rows="100px 50px"
      autoRows="auto"
    >
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
      <Grid row="1 / -1" column="1">
        Hello
      </Grid>
    </Grid>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .grid-template-columns-200px-1fr-200px{grid-template-columns:200px 1fr 200px;}
    .grid-template-areas-\\"header-header\\"-\\"content-content\\"-\\"footer-footer\\"{grid-template-areas:"header header" "content content" "footer footer";}
    .grid-template-rows-100px-50px{grid-template-rows:100px 50px;}
    .grid-auto-rows-auto{grid-auto-rows:auto;}
    .grid-column-1{grid-column:1;}
    .grid-area-header{grid-area:header;}
    .grid-row-1-\\/--1{grid-row:1 / -1;}"
  `);
});

it("should handle backticks in expressions", async () => {
  const uno = await createGenerator(configWithoutSafelistAndPreflights);
  const output = await uno.generate(
    '<Grid areas={`"header header" "content content" "footer footer"`} />'
  );
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: default */
    .grid-template-areas-\\"header-header\\"-\\"content-content\\"-\\"footer-footer\\"{grid-template-areas:"header header" "content content" "footer footer";}"
  `);
});

import { renderToStaticMarkup } from "react-dom/server";
import { createGenerator } from "unocss";
import { expect, it } from "vitest";

import { Box } from "../src/components/Box";
import config from "../uno.config";

it("should generate correct class names", async () => {
  const output = renderToStaticMarkup(
    <Box
      padding="xs"
      margin="xs"
      padding-inline="xs"
      padding-inline-start="xs"
      padding-inline-end="xs"
      padding-block="xs"
      padding-block-start="xs"
      padding-block-end="xs"
      margin-inline="xs"
      margin-inline-start="xs"
      margin-inline-end="xs"
      margin-block="xs"
      margin-block-start="xs"
      margin-block-end="xs"
      md:padding-inline="md"
      md:margin-block="md"
      block-size="3rem"
      min-block-size="3rem"
      max-block-size="3rem"
      inline-size="3rem"
      min-inline-size="3rem"
      max-inline-size="3rem"
      md:block-size="5.5rem"
      md:inline-size="5.5rem"
      border-radius="md"
      border-color="info-dark"
      background-color="info-main"
      border-width={1}
      border-inline-width={1}
      border-inline-start-width={1}
      border-inline-end-width={1}
      position="absolute"
      inset="1rem"
      inset-inline="1rem"
      inset-block-start="1rem"
      inset-block-end="1rem"
      flex="none"
      color="info-surface"
    >
      Hello
    </Box>
  );
  expect(output).toMatchInlineSnapshot(
    `"<div class="padding-xs margin-xs padding-inline-xs padding-inline-start-xs padding-inline-end-xs padding-block-xs padding-block-start-xs padding-block-end-xs margin-inline-xs margin-inline-start-xs margin-inline-end-xs margin-block-xs margin-block-start-xs margin-block-end-xs md:padding-inline-md md:margin-block-md block-size-3rem min-block-size-3rem max-block-size-3rem inline-size-3rem min-inline-size-3rem max-inline-size-3rem md:block-size-5.5rem md:inline-size-5.5rem border-radius-md border-color-info-dark background-color-info-main border-width-1 border-inline-width-1 border-inline-start-width-1 border-inline-end-width-1 position-absolute inset-1rem inset-inline-1rem inset-block-start-1rem inset-block-end-1rem flex-none color-info-surface">Hello</div>"`
  );
});

it("should generate correct CSS", async () => {
  const uno = await createGenerator(config);
  const output = await uno.generate(`
    <Box
      padding="xs"
      margin="auto"
      padding-inline="xs"
      padding-inline-start="xs"
      padding-inline-end="xs"
      padding-block="xs"
      padding-block-start="xs"
      padding-block-end="xs"
      margin-inline="xs"
      margin-inline-start="xs"
      margin-inline-end="xs"
      margin-block="xs"
      margin-block-start="xs"
      margin-block-end="xs"
      md:padding-inline="md"
      md:margin-block="md"
      block-size="3rem"
      min-block-size="3rem"
      max-block-size="3rem"
      inline-size="3rem"
      min-inline-size="3rem"
      max-inline-size="3rem"
      md:block-size="5.5rem"
      md:inline-size="5.5rem"
      border-radius="md"
      border-color="info-dark"
      background-color="info-main"
      border-width={1}
      border-inline-width={1}
      border-inline-start-width={1}
      border-inline-end-width={1}
      position="absolute"
      inset="1rem"
      inset-inline="1rem"
      inset-block-start="1rem"
      inset-block-end="1rem"
      flex="none"
      color="info-surface"
      md:color={condition ? "grey-100" : "grey-800"}
      display={layout === "contents" ? "contents" : undefined}
    >
      Hello
    </Box>
  `);
  expect(output.css).toMatchInlineSnapshot(`
    "/* layer: preflights */
    @layer new-tokens {
    :where(:root, :host) {
    --breakpoints-sm: 640px;
    --breakpoints-md: 768px;
    --breakpoints-lg: 1024px;
    --breakpoints-xl: 1280px;
    --breakpoints-xxl: 1536px;
    --colors-disabled: #909090;
    --colors-text-primary: #1a1a1a;
    --colors-text-secondary: #707070;
    --colors-info-dark: #0B8AAC;
    --colors-info-main: #0EA9D2;
    --colors-info-light: #9BE4F8;
    --colors-info-surface: #F1FBFE;
    --colors-error-dark: #B42E09;
    --colors-error-main: #D62E00;
    --colors-error-light: #FFC3B3;
    --colors-error-surface: #FFF3F0;
    --colors-brand-dark: #245866;
    --colors-brand-main: #4b7a8a;
    --colors-brand-light: #4798ae;
    --colors-brand-surface: #f1fbfe;
    --colors-success-dark: #009906;
    --colors-success-main: #13b91a;
    --colors-success-light: #ade6af;
    --colors-success-surface: #F3FBF4;
    --colors-warning-dark: #C77400;
    --colors-warning-main: #eb8c00;
    --colors-warning-light: #ffd494;
    --colors-warning-surface: #FFF3F0;
    --colors-grey-50: #fafafa;
    --colors-grey-100: #f5f5f5;
    --colors-grey-200: #eeeeee;
    --colors-grey-300: #dddddd;
    --colors-grey-400: #b9b9b9;
    --colors-grey-500: #909090;
    --colors-grey-600: #707070;
    --colors-grey-700: #585858;
    --colors-grey-800: #454545;
    --colors-grey-900: #353535;
    --colors-grey-1000: #1a1a1a;
    --colors-white: #FFFFFF;
    --colors-black: #000000;
    --colors-current: currentColor;
    --colors-transparent: transparent;
    --colors-divider: #eeeeee;
    --spacing-2xs: 0.125rem;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 0.75rem;
    --spacing-lg: 1rem;
    --spacing-xl: 1.25rem;
    --spacing-2xl: 1.5rem;
    --spacing-3xl: 2rem;
    --spacing-4xl: 2.5rem;
    --spacing-5xl: 5rem;
    --border-radius-xs: 0.125rem;
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-full: 50%;
    }
    }
    /* layer: default */
    .flex-none{flex:none;}
    .background-color-black{background-color:var(--colors-black);}
    .background-color-brand-dark{background-color:var(--colors-brand-dark);}
    .background-color-brand-light{background-color:var(--colors-brand-light);}
    .background-color-brand-main{background-color:var(--colors-brand-main);}
    .background-color-brand-surface{background-color:var(--colors-brand-surface);}
    .background-color-current{background-color:var(--colors-current);}
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
    .background-color-transparent{background-color:var(--colors-transparent);}
    .background-color-warning-dark{background-color:var(--colors-warning-dark);}
    .background-color-warning-light{background-color:var(--colors-warning-light);}
    .background-color-warning-main{background-color:var(--colors-warning-main);}
    .background-color-warning-surface{background-color:var(--colors-warning-surface);}
    .background-color-white{background-color:var(--colors-white);}
    .border-color-black{border-color:var(--colors-black);}
    .border-color-brand-dark{border-color:var(--colors-brand-dark);}
    .border-color-brand-light{border-color:var(--colors-brand-light);}
    .border-color-brand-main{border-color:var(--colors-brand-main);}
    .border-color-brand-surface{border-color:var(--colors-brand-surface);}
    .border-color-current{border-color:var(--colors-current);}
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
    .border-color-transparent{border-color:var(--colors-transparent);}
    .border-color-warning-dark{border-color:var(--colors-warning-dark);}
    .border-color-warning-light{border-color:var(--colors-warning-light);}
    .border-color-warning-main{border-color:var(--colors-warning-main);}
    .border-color-warning-surface{border-color:var(--colors-warning-surface);}
    .border-color-white{border-color:var(--colors-white);}
    .color-black{color:var(--colors-black);}
    .color-brand-dark{color:var(--colors-brand-dark);}
    .color-brand-light{color:var(--colors-brand-light);}
    .color-brand-main{color:var(--colors-brand-main);}
    .color-brand-surface{color:var(--colors-brand-surface);}
    .color-current{color:var(--colors-current);}
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
    .color-transparent{color:var(--colors-transparent);}
    .color-warning-dark{color:var(--colors-warning-dark);}
    .color-warning-light{color:var(--colors-warning-light);}
    .color-warning-main{color:var(--colors-warning-main);}
    .color-warning-surface{color:var(--colors-warning-surface);}
    .color-white{color:var(--colors-white);}
    .position-absolute{position:absolute;}
    .block-size-3rem{block-size:3rem;}
    .inline-size-3rem{inline-size:3rem;}
    .max-block-size-3rem{max-block-size:3rem;}
    .max-inline-size-3rem{max-inline-size:3rem;}
    .min-block-size-3rem{min-block-size:3rem;}
    .min-inline-size-3rem{min-inline-size:3rem;}
    .inset-1rem{inset:1rem;}
    .inset-block-end-1rem{inset-block-end:1rem;}
    .inset-block-start-1rem{inset-block-start:1rem;}
    .inset-inline-1rem{inset-inline:1rem;}
    .margin-auto{margin:auto;}
    .margin-block-end-xs{margin-block-end:var(--spacing-xs);}
    .margin-block-start-xs{margin-block-start:var(--spacing-xs);}
    .margin-block-xs{margin-block:var(--spacing-xs);}
    .margin-inline-end-xs{margin-inline-end:var(--spacing-xs);}
    .margin-inline-start-xs{margin-inline-start:var(--spacing-xs);}
    .margin-inline-xs{margin-inline:var(--spacing-xs);}
    .padding-block-end-xs{padding-block-end:var(--spacing-xs);}
    .padding-block-start-xs{padding-block-start:var(--spacing-xs);}
    .padding-block-xs{padding-block:var(--spacing-xs);}
    .padding-inline-end-xs{padding-inline-end:var(--spacing-xs);}
    .padding-inline-start-xs{padding-inline-start:var(--spacing-xs);}
    .padding-inline-xs{padding-inline:var(--spacing-xs);}
    .padding-xs{padding:var(--spacing-xs);}
    .border-inline-end-width-1{border-inline-end-width:1px;}
    .border-inline-start-width-1{border-inline-start-width:1px;}
    .border-inline-width-1{border-inline-width:1px;}
    .border-width-1{border-width:1px;}
    .border-radius-md{border-radius:var(--radii-md);}
    .display-contents{display:contents;}
    @media (min-width: 768px){
    .md\\:block-size-5\\.5rem{block-size:5.5rem;}
    .md\\:inline-size-5\\.5rem{inline-size:5.5rem;}
    .md\\:margin-block-md{margin-block:var(--spacing-md);}
    .md\\:padding-inline-md{padding-inline:var(--spacing-md);}
    }"
  `);
});

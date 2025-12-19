# Unocss Showcase

This demo project shows how flexible [Unocss](https://unocss.dev/) is and how you
can adjust it to your needs, even exotic ones.

## The goal

I wanted to create primitive layout components like Box, Stack, Grid, etc.,
which props values can be specified in a human-readable form. So instead of writing
cryptic Tailwind classes like `grid-cols-[200px_minmax(900px,_1fr)_100px]`, you could
write `<Grid columns="200px minmax(900px, 1fr) 100px" />` (which is more aligned with
the CSS syntax) and get the same static css extraction we all love.

## Extractor

To achieve this, I created my own attributes extractor that allows spaces in
attribute values.

## Differences with [attributify-preset](https://unocss.dev/presets/attributify)

 - You can use spaces in attribute values
 - You can specify certain components to extract attributes from
 - It generates classes, not attribute selectors

## Repo description

 - `unocss` specific code, including `theme`, `config`, `extractor` and other utilities lives in the `unocss` directory
 - components live in the `components` directory
 - all components inherit from the general `UnocssComponent`
 - code is almost fully covered with tests

## For everyone

Feel free to play around with the project, run tests and storybook,
and please don't hesitate to ask questions and contribute.

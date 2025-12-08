import type { Extractor } from "unocss";

const SPACES = String.raw`\s*`;
const COMPONENT_NAME = `[a-zA-Z][a-zA-Z]*`;
const ATTRIBUTE_NAME = `[a-zA-Z][-a-zA-Z:]*`;
const DOUBLE_QUOTE_ATTRIBUTE_VALUE = `"[^"]*?"`;
const SINGLE_QUOTE_ATTRIBUTE_VALUE = `'[^']*?'`;
const EXPRESSION_ATTRIBUTE_VALUE = `{${SPACES}.*?${SPACES}}`;
const ATTRIBUTE_VALUE = `
  (?:
      ${DOUBLE_QUOTE_ATTRIBUTE_VALUE} |
      ${SINGLE_QUOTE_ATTRIBUTE_VALUE} |
      ${EXPRESSION_ATTRIBUTE_VALUE}
  )
`;

const ELEMENT_RE = new RegExp(
  String.raw`
  <
    (?<name>${COMPONENT_NAME})
    (?<attributes>
      (?:
        (\s+${ATTRIBUTE_NAME}${SPACES}=${SPACES}${ATTRIBUTE_VALUE}) |
        (\s+${ATTRIBUTE_NAME}${SPACES}[^=])
      )+
    )
    \s*
  \/?>
`.replaceAll(/\s+/g, ""),
  "g"
);

const ATTRIBUTE_RE = new RegExp(
  String.raw`
    (?<name>${ATTRIBUTE_NAME})
    ${SPACES}=${SPACES}
    (?<value>${ATTRIBUTE_VALUE})
`.replaceAll(/\s+/g, ""),
  "g"
);

const STRING_RE = /(["'`])(?<value>.*?)\1/g;

const NUMBER_RE = /(?<value>\b\d+(\.\d+)?\b)/g;

export function extractor({
  components,
}: {
  components?: string[];
}): Extractor {
  return {
    name: "extractor",
    extract({ code }) {
      const results: string[] = [];
      let elementMatch: RegExpExecArray | null = null;
      while ((elementMatch = ELEMENT_RE.exec(code)) !== null) {
        let attributeMatch: RegExpExecArray | null = null;
        const component = elementMatch.groups!.name;

        if (components && !components.includes(component)) continue;

        while (
          (attributeMatch = ATTRIBUTE_RE.exec(
            elementMatch.groups!.attributes
          )) !== null
        ) {
          let value = attributeMatch.groups!.value;
          const name = attributeMatch.groups!.name;
          const isExpression = value.startsWith("{");
          value = value.slice(1, -1).trim();

          if (!isExpression) {
            results.push(`${name}-${value}`);
            continue;
          }

          let stringMatch: RegExpExecArray | null;
          let numberMatch: RegExpExecArray | null;

          // Get all strings from the expression
          while ((stringMatch = STRING_RE.exec(value)) !== null) {
            results.push(`${name}-${stringMatch.groups!.value}`);
          }

          // Remove all strings from the expression to avoid
          // picking numbers inside them
          value = value.replace(STRING_RE, " ");

          // Get all standalone numbers from the expression
          while ((numberMatch = NUMBER_RE.exec(value)) !== null) {
            results.push(`${name}-${numberMatch.groups!.value.trim()}`);
          }
        }
      }
      return results;
    },
  };
}

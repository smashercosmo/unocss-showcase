import { type Extractor } from "unocss";

import { extractAttributes } from "./utils/extractAttributes";

export function attributifyExtractor(): Extractor {
  return {
    name: "attributify-extractor",
    extract({ code }) {
      return extractAttributes(code)
        .filter(({ name }) => {
          return !["class", "className", "style"].includes(name);
        })
        .flatMap(({ name, values }) => {
          return values.map((v) => `${name}-${v}`);
        });
    },
  };
}

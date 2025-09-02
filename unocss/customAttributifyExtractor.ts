/*
 * This code copied as is from
 * https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/extractor.ts
 *
 * splitterRE has been changed
 */

import { isValidSelector, type Extractor, type ExtractorContext } from "unocss";
import { type AttributifyOptions } from "unocss/preset-attributify";

const strippedPrefixes = ["v-bind:", ":"];

// this is the only line that have been changed to keep whitespaces in css values
const splitterRE = /['"`;]+/g;

const elementRE =
  /<[^>\s]*\s((?:'[^']*'|"[^"]*"|`[^`]*`|\{[^}]*}|=>|[^>]*?)*)/g;
const valuedAttributeRE =
  /(\?|(?!\d|-{2}|-\d)[\w\u00A0-\uFFFF:!%.~<-]+)=?(?:"([^"]*)"|'([^']*)'|\{([^}]*)})?/g;

export const defaultIgnoreAttributes = [
  "placeholder",
  "fill",
  "opacity",
  "stroke-opacity",
];

export function customAttributifyExtractor(
  options?: AttributifyOptions
): Extractor {
  const ignoreAttributes = options?.ignoreAttributes ?? defaultIgnoreAttributes;
  const nonValuedAttribute = options?.nonValuedAttribute ?? true;
  const trueToNonValued = options?.trueToNonValued ?? false;

  return {
    name: "@unocss/preset-attributify/extractor",
    extract({ code }) {
      return Array.from(code.matchAll(elementRE))
        .flatMap((match) =>
          Array.from((match[1] || "").matchAll(valuedAttributeRE))
        )
        .flatMap(([, name, ...contents]) => {
          const content = contents.filter(Boolean).join("");

          if (ignoreAttributes.includes(name)) return [];

          for (const prefix of strippedPrefixes) {
            if (name.startsWith(prefix)) {
               
              name = name.slice(prefix.length);
              break;
            }
          }

          if (!content) {
            if (isValidSelector(name) && nonValuedAttribute) {
              const result = [`[${name}=""]`];
              if (trueToNonValued) result.push(`[${name}="true"]`);
              return result;
            }
            return [];
          }

          if (["class", "className"].includes(name)) {
            return content.split(splitterRE).filter(isValidSelector);
          }
          if (elementRE.test(content)) {
            elementRE.lastIndex = 0;
            return this.extract!({
              code: content,
            } as ExtractorContext) as string[];
          }
          if (
            options?.prefixedOnly &&
            options.prefix &&
            !name.startsWith(options.prefix)
          )
            return [];

          return content
            .split(splitterRE)
            .filter((v) => Boolean(v) && v !== ":")
            .map((v) => `[${name}~="${v}"]`);
        });
    },
  };
}

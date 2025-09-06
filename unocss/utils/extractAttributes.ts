type Attribute = {
  name: string;
  values: (string | number)[];
  component: string;
};

export function extractAttributes(
  code: string,
  currentComponent = "root"
): Attribute[] {
  const attributes: Attribute[] = [];
  let i = 0;

  // Extract all strings and standalone numbers from an expression
  function extractValuesFromExpression(expr: string): (string | number)[] {
    const values: (string | number)[] = [];

    // Match all string literals
    const stringRegex = /(["'])(.*?)\1/g;
    let match: RegExpExecArray | null;
    const stringsInExpr: string[] = [];
    while ((match = stringRegex.exec(expr)) !== null) {
      stringsInExpr.push(match[2]);
    }

    // Remove all strings to avoid picking numbers inside them
    const exprWithoutStrings = expr.replace(stringRegex, " ");

    // Extract standalone numbers
    const numberRegex = /\b\d+(\.\d+)?\b/g;
    while ((match = numberRegex.exec(exprWithoutStrings)) !== null) {
      values.push(Number(match[0]));
    }

    // Add all string literals
    values.push(...stringsInExpr);

    return values;
  }

  function parseTag(parentComponent: string) {
    while (i < code.length) {
      while (/\s/.test(code[i])) i++;

      if (code[i] !== "<") {
        i++;
        continue;
      }
      i++; // skip '<'

      let isFragment = false;
      if (code[i] === ">") {
        isFragment = true;
        i++;
      }

      let compName = parentComponent;
      if (!isFragment && /[A-Za-z]/.test(code[i])) {
        const start = i;
        while (/[A-Za-z0-9_-]/.test(code[i])) i++;
        compName = code.slice(start, i);
      }

      // Parse attributes in opening tag
      while (i < code.length) {
        while (/\s/.test(code[i])) i++;
        if (code[i] === "/" && code[i + 1] === ">") {
          i += 2;
          break;
        } else if (code[i] === ">") {
          i++;
          break;
        }

        const startAttr = i;
        while (/[a-zA-Z0-9-:]/.test(code[i])) i++;
        if (startAttr === i) break;
        const name = code.slice(startAttr, i);

        while (/\s/.test(code[i])) i++;
        if (code[i] !== "=") continue;
        i++;
        while (/\s/.test(code[i])) i++;

        const values: (string | number)[] = [];

        if (code[i] === '"' || code[i] === "'") {
          const quote = code[i++];
          let val = "";
          while (i < code.length) {
            if (code[i] === "\\" && code[i + 1] === quote) {
              val += quote;
              i += 2;
            } else if (code[i] === quote) {
              i++;
              break;
            } else {
              val += code[i++];
            }
          }
          val = val.replace(/[\r\n]+/g, " ").trim();
          values.push(val);
          attributes.push({ name, values, component: compName });
        } else if (code[i] === "{") {
          let depth = 0;
          const exprStart = i;
          do {
            if (code[i] === "{") depth++;
            else if (code[i] === "}") depth--;
            i++;
          } while (i < code.length && depth > 0);

          const expr = code
            .slice(exprStart, i)
            .replace(/[\r\n]+/g, " ")
            .trim();

          // If contains nested JSX, recurse
          if (/<[A-Za-z]/.test(expr) || expr.includes("<>")) {
            const nestedAttrs = extractAttributes(expr, "");
            attributes.push(...nestedAttrs);
          } else {
            values.push(...extractValuesFromExpression(expr));
            attributes.push({ name, values, component: compName });
          }
        }
      }

      // Skip children
      if (code[i - 2] === "/" && code[i - 1] === ">") continue;

      let depth = 1;
      while (i < code.length && depth > 0) {
        if (code[i] === "<" && code[i + 1] !== "/") {
          parseTag(compName);
        } else if (code[i] === "<" && code[i + 1] === "/") {
          depth--;
          i++;
          while (i < code.length && code[i] !== ">") i++;
          i++;
        } else {
          i++;
        }
      }
    }
  }

  parseTag(currentComponent);
  return attributes;
}

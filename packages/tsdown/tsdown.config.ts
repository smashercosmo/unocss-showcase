import { defineConfig } from "tsdown";
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as url from 'node:url';

/** extracted-content-start **/
export const base = {
  clean: false,
  dts: true,
  exports: {
    all: true,
  },
  fixedExtension: false,
  deps: {
    onlyBundle: false,
  },
} as const;
/** extracted-content-end **/

const currentFilePath = url.fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFilePath);
const currentFileContent = fs.readFileSync(currentFilePath, 'utf-8');

// Capture everything between the start and end comment blocks
const extractedContentStartMarker = '/** extracted-content-start **/';
const extractedContentEndMarker = '/** extracted-content-end **/';

const extractFromIndex = currentFileContent.indexOf(extractedContentStartMarker);
const extractUpUntilIndex = currentFileContent.indexOf(extractedContentEndMarker);

export default defineConfig({
  ...base,
  entry: ["./src/index.ts"],
  hooks: {
    'build:prepare': () => {
      const extractedContent = currentFileContent.substring(extractFromIndex + extractedContentStartMarker.length, extractUpUntilIndex).trim();
      fs.writeFileSync(path.resolve(currentDirName, './src/index.ts'), extractedContent, 'utf-8');
    },
    'build:done': () => {
      fs.unlinkSync('./src/index.ts');
    },
  },
});

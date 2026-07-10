import { createBoxComponent } from "unocss-box-component-vite-plugin/component";
import { type PropsFromDescriptor } from "unocss-box-component-vite-plugin/shared";
import { descriptors } from "../../descriptors";
import { theme } from "../../tokens";

type Theme = typeof theme;
type Display = PropsFromDescriptor<Theme, typeof descriptors.display>

export const Box = createBoxComponent<Theme, Display>({ descriptors: Object.values(descriptors), breakpoints: ["xs", "sm", "lg"] });
export type GenericTheme = Record<string, Record<string, string | number>>;

export type Descriptor<Theme extends GenericTheme> = {
  properties: (
    | string
    | { name: string; shortcut?: string; fallback?: string }
    )[];
  token?: Extract<keyof Theme, string>;
  values?: (string | number)[];
  isUnitlessNumberAShortcutForPixelValue?: boolean;
};

export type PropsFromDescriptor<
  Theme extends GenericTheme,
  D extends Descriptor<Theme>,
  O extends { shortcuts: boolean } = { shortcuts: false },
> = {
  [
  P in D["properties"][number] as O["shortcuts"] extends true
    ? P extends { shortcut: string }
      ? P["shortcut"]
      : never
    : P extends string
      ? P
      : P extends { name: string }
        ? P["name"]
        : never
  ]?: [
      | (D["token"] extends keyof Theme ? keyof Theme[D["token"]] : never)
      | (D["values"] extends ReadonlyArray<infer V> ? V : never),
  ] extends [never]
    ? string | number
    : | (D["token"] extends keyof Theme ? keyof Theme[D["token"]] : never)
    | (D["values"] extends ReadonlyArray<infer V> ? V : never);
};
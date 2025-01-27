import {
  createTheme,
  DefaultMantineColor,
  MantineColorsTuple,
} from "@mantine/core"

type ExtendedCustomColors =
  | "soil"
  | "green"
  | "teal"
  | "darkteal"
  | DefaultMantineColor

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}

export const defaultTheme = createTheme({
  breakpoints: {
    xxs: "20em",
    xs: "40em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "100em",
    xxl: "135em",
  },
  colors: {
    leaf: [
      "#f6fde9",
      "#ecf8d7",
      "#d9f0ad",
      "#c4e87f",
      "#b2e05a",
      "#a7dc42",
      "#a0da34",
      "#8bc126",
      "#7bac1e",
      "#67940f",
    ],
    atlantic: [
      "#239582",
      "#208978",
      "#1d7e6e",
      "#1a7364",
      "#17685b",
      "#145d51",
      "#115248",
      "#0e483f",
      "#0c3e36",
      "#09342d",
    ],
    soil: [
      "#faf4ef",
      "#efe6e0",
      "#e1caba",
      "#d4ad91",
      "#c9946f",
      "#c28458",
      "#c07c4c",
      "#a9693d",
      "#975d34",
      "#844f29",
    ],
  },
  headings: { fontFamily: "Truculenta, sans-serif" },
  primaryColor: "teal",
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
})

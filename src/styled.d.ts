import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    subTextColor: string;
    themeColor: string;
    appTitleColor: string;
    lineColor: string;
  }
}

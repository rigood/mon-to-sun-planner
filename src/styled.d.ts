import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    subTextColor: string;
    appTitleColor: string;
    dayBgColor: string;
    lineColor: string;
    hoverColor: string;
    modalBgColor: string;
  }
}

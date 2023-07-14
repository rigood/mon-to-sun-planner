import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import PretendardWoff2 from "../assets/fonts/Pretendard-Regular.woff2";
import PretendardWoff from "../assets/fonts/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
  font-family: "pretendard";
  src: url(${PretendardWoff2}) format("woff2"),
  url(${PretendardWoff}) format("woff");
  font-weight: 400;
  font-style: normal;
}

*, *::before, *::after{
  box-sizing: border-box;
}


body{
  font-family: "pretendard";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  line-height: 1.3;
}
`;

export default GlobalStyle;

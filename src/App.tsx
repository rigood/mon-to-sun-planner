import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";

import Main from "./Main";

import PretendardWoff2 from "./Fonts/Pretendard-Regular.woff2";
import PretendardWoff from "./Fonts/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
  font-family: "pretendard";
  src: url(${PretendardWoff2}) format("woff2"),
  url(${PretendardWoff}) format("woff");
}

*{
  box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

body{
  font-family: "pretendard";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  line-height: 1.3;
}
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  );
}

export default App;

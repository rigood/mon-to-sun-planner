import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Main from "./pages/Main";
import GlobalStyle from "./styles/globalStyle";
import GlobalModal from "./components/Modal/GlobalModal";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
      <GlobalModal />
    </ThemeProvider>
  );
}

export default App;

import './App.css';
import Candidates from './../components/AdminPanel';
import RouterSwitch from '@src/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;

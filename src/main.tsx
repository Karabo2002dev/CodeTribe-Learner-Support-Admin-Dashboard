import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {BrowserRouter}  from "react-router-dom"
import theme from './theme.ts';
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <BrowserRouter>
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
   
);

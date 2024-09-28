import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from './Snackbar';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
);

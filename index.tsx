import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider, ThemeProvider, GlobalConfigProvider } from './contexts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GlobalConfigProvider>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </GlobalConfigProvider>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from "react-dom/client";
import { ThemeProvider } from './components/ui';
import AppContent from './components/AppContent';
import { TelemetryProvider } from './telemetry/TelemetryContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TelemetryProvider>
        <AppContent />
      </TelemetryProvider>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}

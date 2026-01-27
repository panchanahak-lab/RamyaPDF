import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Lazy load App to catch import errors
const App = React.lazy(() => import('./App'));

const rootElement = document.getElementById('root');

// CRITICAL DEBUGGING: Global Error Handler to catch White Screen of Death
window.onerror = function (message, source, lineno, colno, error) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:20px;z-index:9999;font-family:monospace;white-space:pre-wrap;';
  errorDiv.textContent = `CRITICAL ERROR:\n${message}\n\nSource: ${source}:${lineno}:${colno}\n\nStack:\n${error?.stack || 'No stack'}`;
  document.body.appendChild(errorDiv);
  console.error("Global Error Caught:", error);
};

window.onunhandledrejection = function (event) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;height:50%;background:darkred;color:white;padding:20px;z-index:9999;font-family:monospace;white-space:pre-wrap;overflow:auto;';
  errorDiv.textContent = `UNHANDLED PROMISE REJECTION:\n${event.reason?.toString()}\n\nStack:\n${event.reason?.stack || 'No stack'}`;
  document.body.appendChild(errorDiv);
  console.error("Unhandled Rejection:", event.reason);
};

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", fontFamily: "sans-serif" }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div style={{ padding: 20 }}>Loading application...</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

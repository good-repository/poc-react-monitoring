import { monitor } from 'react-monitoring';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormErrorPage, ListPage, Menu } from './components';


monitor.init({
  provider: 'datadog',
  environment: import.meta.env.VITE_DATADOG_ENV,
  token: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  trackErrors: false,
  service: 'poc-react-monitoring',
  errorBoundaryDefaultValues: {
    fallback: <div>Something went wrong</div>,
    logOptions: {
      level: 'warn',
      logProperties: { action: 'app' },
      message: 'App initialized',
    }
  }
});


// example custom logger
// monitor.init({
//   provider: 'custom',
//   environment: import.meta.env.VITE_DATADOG_ENV,
//   token: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
//   service: 'poc-react-monitoring',
//   customLoggerFn: (log) => {
//     console.log('Custom logger:', log);
//   }
// });


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<FormErrorPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

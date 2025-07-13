import { monitor } from 'react-monitoring';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormErrorPage, ListPage, Menu } from './components';


monitor.init({
  provider: 'datadog',
  env: import.meta.env.VITE_DATADOG_ENV,
  token: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  trackErrors: false,
  service: 'poc-react-monitoring',
});

// example custom logger
// monitor.init({
//   provider: 'custom',
//   env: import.meta.env.VITE_DATADOG_ENV,
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

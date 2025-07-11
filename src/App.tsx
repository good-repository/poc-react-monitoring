import { useState } from 'react';
import { ErrorBoundary, monitor } from 'react-monitoring';
import { loggerUtil } from './logger';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchWithError } from './api';


monitor.init({
  provider: 'datadog',
  env: import.meta.env.VITE_DATADOG_ENV,
  token: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  trackErrors: false,
  service: 'poc-react-monitoring',
});

function Menu() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/">Form Error</Link> |{' '}
      <Link to="/list">List & Load More</Link>
    </nav>
  );
}

function FormErrorPage() {
  function handleSubmit(e: React.FormEvent) {
    loggerUtil.log({
      message: 'Form submission error teste 3',
      tags: ['form', 'error'],
      level: 'error',
    })
    e.preventDefault();
    // This will throw an error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.undefinedFunction();
  }
  return (
    <div >
      <h2>Form Error Example</h2>
      <button onClick={handleSubmit}>Submit (throws error)</button>
    </div>
  );
}

function ListPage() {
  const [items] = useState([{ id: 1, name: 'Item 1' }]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    setError(null);
    try {
      await fetchWithError();
    } catch (err: unknown) {
      setError('Failed to load more (expected 4xx error)');
      loggerUtil.log({
        level: 'error',
        message: 'HTTP 4xx error on load more',
        customProperties: { action: 'loadMore', error: err },
        tags: ['http', 'list'],
      });
    } finally {
      setLoading(false);
    }
  }

  function ListItem({ item }: { item: { id: number; name: string } }) {
    // return <span>{item.name} - {item.blowall.now}</span>; // will trigger an error
    return <span>{item.name}</span>;
  }

  return (
    <ErrorBoundary
      fallback={<div>Something went wrong in a component.</div>}
      logOptions={{
        level: 'warn',
        tags: ['error-boundary'],
        customProperties: { action: 'errorBoundary' },
        message: `Error in item list component`,
      }}
    >
      <div>
        <h2>List Example</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <ListItem item={item} />
            </li>
          ))}
        </ul>
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More (triggers 4xx)'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </ErrorBoundary>
  );
}

function App() {

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<FormErrorPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;

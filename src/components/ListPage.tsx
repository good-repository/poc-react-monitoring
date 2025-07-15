import { useState } from "react";
import { ErrorBoundary, logger } from "react-monitoring";
import { fetchWithError } from "../api";

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
      logger.warn({
        message: 'HTTP 4xx error on load more',
        logProperties: { action: 'loadMore', error: err },
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
        logProperties: { action: 'errorBoundary' },
        message: `Error in item list component`,
        level: 'error',
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

export default ListPage;
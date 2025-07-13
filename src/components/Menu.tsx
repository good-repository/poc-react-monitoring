import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/">Form Error</Link> |{' '}
      <Link to="/list">List & Load More</Link>
    </nav>
  );
}

export default Menu;
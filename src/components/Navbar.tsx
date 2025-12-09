import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#0077b6", color: "white" }}>
      <h2>Travel App</h2>
      <div>
        <Link to="/" style={{ margin: "0 1rem", color: "white" }}>Home</Link>
        <Link to="/destinations" style={{ margin: "0 1rem", color: "white" }}>Destinations</Link>
        <Link to="/about" style={{ margin: "0 1rem", color: "white" }}>About</Link>
      </div>
    </nav>
  );
};

export default Navbar;

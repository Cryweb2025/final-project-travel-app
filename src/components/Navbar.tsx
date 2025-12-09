import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ 
      padding: "1rem", 
      background: "#0077b6", 
      color: "white", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    }}>
      <h2>Travel App</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ margin: "0 1rem", color: "white" }}>Home</Link>
        <Link to="/destinations" style={{ margin: "0 1rem", color: "white" }}>Destinations</Link>
        <Link to="/about" style={{ margin: "0 1rem", color: "white" }}>About</Link>
      </div>
      {/* Login Button oben rechts */}
      <div>
        <Link 
          to="/login" 
          style={{ 
            background: "white", 
            color: "#0077b6", 
            padding: "0.5rem 1rem", 
            borderRadius: "4px", 
            textDecoration: "none" 
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


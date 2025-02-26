import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalState";
import "./Navbar.css";

const Navbar = () => {
  const { state, dispatch } = useGlobalContext();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({state.cart.length})</Link>
      {state.user === "admin" ? (
        <>
          <Link to="/admin">Admin</Link>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </>
      ) : (
        <Link to="/admin-login">Admin Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

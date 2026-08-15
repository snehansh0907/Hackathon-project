import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

/**
 * Top navigation bar.
 * `user` is null when signed out. `onLogout` is called when the
 * logout control is clicked (wired up in App.jsx).
 */
export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">TT</span>
          <span className="navbar__brand-name">ToiletTrust</span>
        </Link>

        <nav className="navbar__links">
          <Link to="/" className="navbar__link">
            Map
          </Link>

          {user ? (
            <button className="btn btn-secondary navbar__auth-btn" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="btn btn-secondary navbar__auth-btn">
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

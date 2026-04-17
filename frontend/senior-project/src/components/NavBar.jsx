import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/upscale-logo.png";
import { useAuth } from "../hooks/AuthContext";
import { signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase";
import "./Navbar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, loadingUser } = useAuth();

  const navItems = [
    { to: "/learningCenter", label: "Learning Center" },
    { to: "/budget", label: "Budgeting" },
    { to: "/news", label: "News" },
    { to: "/stocks", label: "Live Stocks" },
    { to: "/career", label: "Career Path" },
    { to: "/papertrade", label: "Paper Trading" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate("/home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/home" className="nav-logo">
            <div className="logo-wrapper">
              <img src={logo} alt="Upscale logo" /> 
            </div>
            <span className="logo-text">Upscale</span>
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                <div className="link-underline"></div>
              </Link>
            ))}
          </div>
        </div>

        
        <div className="nav-right">
          {!loadingUser && currentUser ? (
            <>
              <span className="user-chip">
                {currentUser.displayName || currentUser.email || "Signed in"}
              </span>
              <button type="button" className="login-btn logout-btn" onClick={handleLogout}>
                <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/signUp" className="signup-btn">
                <span>Sign Up</span>
                <div className="btn-glow"></div>
              </Link>
              <Link to="/login" className="login-btn">
                <span>Log in</span>
              </Link>
            </>
          )}
          <button
            type="button"
            className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="hamburger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-menu-panel ${mobileMenuOpen ? "open" : ""}`}
      >
        <div className="mobile-menu-links">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-nav-link ${isActive(item.to) ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

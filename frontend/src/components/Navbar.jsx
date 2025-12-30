import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/api";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          User Management
        </Link>

        {user && (
          <div className="nav-right">
            <span className="user-info">
              {user.fullName}{" "}
              <span className={`badge ${user.role}`}>{user.role}</span>
            </span>

            <div className="nav-links">
              {user.role === "admin" && <Link to="/admin">Dashboard</Link>}
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

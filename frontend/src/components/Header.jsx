import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">Przychodnia.pl</Link>
      </div>
      <div className="buttons">
        <ul>
          {user && user.role == "patient" ? (
            <li>
              <button className="btn">
                <Link className="btn" to="/patient-dashboard">
                  <FaUser /> Patient Dashboard
                </Link>
              </button>
            </li>
          ) : (
            <>
              {user && user.role == "staff" ? (
                <li>
                  <button className="btn">
                    <Link className="btn" to="/staff-dashboard">
                      <FaUser /> Staff Dashboard
                    </Link>
                  </button>
                </li>
              ) : (
                <></>
              )}
            </>
          )}
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;

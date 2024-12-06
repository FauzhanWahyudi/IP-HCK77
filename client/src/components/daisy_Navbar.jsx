import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const profileRedux = useSelector((state) => state.profileReducer.value);
  return (
    <nav className="sticky top-0 z-50">
      <div className="navbar bg-base-300 shadow-md">
        {/* Logo and Brand */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center">
            <img
              src="logo.jpg"
              alt="Logo"
              className="w-8 h-8 rounded-full border-2 border-secondary"
            />
            <span className="ml-2 text-lg font-bold text-primary">
              PlotAlchemy
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="text-base-content hover:text-secondary" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-base-content hover:text-secondary"
                to="/genres"
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                className="text-base-content hover:text-secondary"
                to="/user/my-cauldron"
              >
                My Cauldron
              </Link>
            </li>
            <li>
              <a
                href="#footer"
                className="text-base-content hover:text-secondary"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login/Logout */}
        <div className="navbar-end">
          {localStorage.getItem("access_token") ? (
            <details className="dropdown">
              <summary className="btn btn-circle m-1 border-none">
                <img src={profileRedux.profilePicture} alt="" className="w-9 h-8 rounded-full object-cover"/>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] right-2 w-auto p-2 shadow">
                  <li><Link to={"#"} className="font-bold text-info btn-disabled">{profileRedux.fullName}</Link></li>
                  <li>
                      <Link
                        className="text-base-content hover:text-secondary"
                        to="/user/profile"
                      >
                        Profile
                      </Link>
                  </li>
                  <li>            
                        <Link className="text-error  hover:text-red-60git0" to="/logout">
                          Logout
                        </Link>
                  </li>
                </ul>
                </details>
          ) : (
            <Link className="btn btn-ghost" to="/login/google">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

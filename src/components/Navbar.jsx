import { useDarkMode } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggle } = useDarkMode();
  const toggleClass = () => {
    toggle();
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { state: { from: "logout" } });
  };
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          esjeu
        </a>
      </div>
      <div>
        <button onClick={toggleClass}>
          Toggle theme {isDarkMode ? "☀️" : "🌝"}
        </button>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

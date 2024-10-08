import { useDarkMode } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
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

      <div className="flex justify-center gap-3">
        <button onClick={toggleClass} className="btn btn-ghost">
          Toggle Theme {isDarkMode ? "🌚" : "🌝"}
        </button>
        <div className="inline-flex items-center gap-3">
          <div className="w-10 rounded-full overflow-hidden">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p>{username}</p>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useDarkMode } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

const colors = ["blue", "green", "yellow", "red", "indigo", "purple", "pink"];
const getColorClassForUsername = (username, initials) => {
  const seed = username
    .concat(initials)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[seed % colors.length];
};

const Navbar = ({ username, initials }) => {
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
          <div className="w-10 aspect-square rounded-full overflow-hidden">
            <div
              className={`w-full h-full bg-gradient-to-b from-${getColorClassForUsername(username, initials)}-400 to-${getColorClassForUsername(username, initials)}-600 text-center text-white font-bold flex items-center justify-center`}
            >
              {initials}
            </div>
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

import { NavLink } from "react-router";
import Drawer from "./Drawer";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Nav() {
  const { user, handleLogout } = useAuth();
  const links = [
    {
      id: 1,
      path: "/auth/newtask",
      name: "New Task",
    },
    {
      id: 2,
      path: "/auth/mytask",
      name: "All Tasks",
    },
  ];

  return (
    <div className="sticky z-50 bg-white">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <NavLink to="/">
          <img
            src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
            alt="Logo"
            className="w-[157px] h-[41px]"
          />
        </NavLink>

        {user ? (
          <div className="hidden sm:flex items-center space-x-6 text-xl font-semibold">
            {links.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-purple-500 font-semibold" : "text-black"
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              className="hidden sm:flex bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold rounded-lg px-2 py-2 text-lg shadow-lg shadow-purple-200"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </button>
            <img src="./profile.png" alt="Profile" />
          </div>
        ) : (
          <div className="hidden sm:flex items-center space-x-6 text-xl font-semibold">
            <div className="flex items-center space-x-4 font-semibold">
              <Link
                to="auth/register"
                className="btn btn-outline border-[#980ffa] text-[#980ffa] text-lg"
              >
                Register
              </Link>
              <Link
                to="auth/login"
                className="btn btn-soft bg-[#980ffa] text-white hover:bg-[#7a0cc7] text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        )}

        <div className="block sm:hidden">
          <div className="flex items-center gap-3">
            <Drawer handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Drawer({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Menu
        onClick={() => setIsOpen(true)}
        className="lg:hidden text-purple-600"
      />
      <div
        className={`drawer fixed top-0 left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="relative menu bg-white text-black h-screen w-90">
            <button
              className="absolute right-0 top-3 btn btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="" />
            </button>
            <div>
              <NavLink to="/">
                <img
                  src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
                  alt=""
                  className="w-[157px] h-[41px]"
                />
              </NavLink>
            </div>

            <div className="">
              {user ? (
                <div>
                  <div className="mt-5 text-lg font-semibold">
                    <p>Hi, {user?.username}</p>
                    <hr className="text-[#980ffa] mt-2" />
                  </div>
                  <div className="flex flex-col gap-5 text-lg mt-2">
                    <Link to="auth/newtask" onClick={() => setIsOpen(false)}>
                      New Task
                    </Link>
                    <Link to="auth/mytask" onClick={() => setIsOpen(false)}>
                      All Task
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-5 text-lg">
                  <Link
                    to="auth/register"
                    className="text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="auth/login"
                    className="text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
            {user ? (
              <>
                {" "}
                <div className="absolute bottom-0">
                  <div className="flex items-center gap-2 p-2">
                    <LogOut />
                    <a onClick={handleLogout} className="text-lg font-bold">
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

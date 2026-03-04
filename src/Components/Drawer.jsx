import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="relative menu bg-white text-black min-h-screen w-90 p-4">
            <button
              className="absolute right-0 top-5 btn btn-circle btn-sm btn-ghost"
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
            <div className="mt-10 text-lg flex flex-col gap-8 text-xl font-semibold">
              <Link to="auth/newtask" onClick={() => setIsOpen(false)}>
                New Task
              </Link>
              <Link to="auth/mytask" onClick={() => setIsOpen(false)}>
                All Task
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { NavLink } from "react-router";
import Drawer from "./Drawer";

export default function Nav() {
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
            alt=""
            className="w-[157px] h-[41px]"
          />
        </NavLink>
        <div className="hidden sm:flex items-center space-x-6 text-xl font-semibold">
          {links.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-purple-500 font-semibold" : ""
              }
            >
              {item.name}
            </NavLink>
          ))}
          <img src="./profile.png" alt="" />
        </div>
        <div className="block sm:hidden">
          <div className="flex items-center gap-3">
            <img src="./profile.png" alt="" />
            <Drawer />
          </div>
        </div>
      </div>
    </div>
  );
}

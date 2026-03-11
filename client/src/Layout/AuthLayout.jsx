import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <section className="grid grid-cols-12 items-center justify-center h-screen lg:min-h-screen overflow-hidden">
      <div className="hidden md:block col-span-6 h-full">
        <div
          className=""
          style={{
            backgroundImage: "url('/authBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            overflow: "hidden"
          }}
        ></div>
      </div>
      <div className="col-span-12 md:col-span-6 p-4 bg-white">
        <Outlet />
      </div>
    </section>
  );
}

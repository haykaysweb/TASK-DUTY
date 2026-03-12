import { Link, Outlet } from "react-router";
import Nav from "../Components/Nav";


export default function Rootlayout() {
  return (
      <>
      <Nav />
      <hr className="text-gray-300" />

     <Outlet/>
    </>
  )
}

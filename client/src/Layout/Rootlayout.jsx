import {  Outlet } from "react-router";
import Nav from "../Components/Nav";


export default function RootLayout() {
  return (
      <>
      <Nav />
      <hr className="text-gray-300" />

     <Outlet/>
    </>
  )
}

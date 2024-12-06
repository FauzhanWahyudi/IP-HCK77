import { Outlet } from "react-router-dom";
import NavigationBar from "../components/daisy_Navbar";
import FooterPage from "../components/daisy_Footer";

export default function Layout() {
  return (
    <div>
      {/* <Navbar /> */}
      <NavigationBar />
      <Outlet />
      <FooterPage />
      {/* <Footer /> */}
    </div>
  );
}

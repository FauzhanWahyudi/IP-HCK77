import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Layout from "./pages/Layout";
// import HomePage from "./pages/New_HomePage";
import GenresPage from "./pages/daisy_GenresPage";
import MyCauldronPage from "./pages/daisy_MyCauldronPage";
import ProfilePage from "./pages/daisy_Profile_Page";
import LoginPage from "./pages/daisy_LoginPage";
import HomePage from "./pages/daisy_HomePage";
import Swal from "sweetalert2";
const clientId = import.meta.env.VITE_Google_OAuth_Client_ID;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "genres",
        element: <GenresPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("/login/google");
      }
    },
    children: [
      {
        path: "my-cauldron",
        element: <MyCauldronPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login/google",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return redirect("/");
      }
    },
  },
  {
    path: "/logout",
    loader: () => {
      localStorage.clear();
      Swal.fire({
        icon: "success",
        title: "You're logging out",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
          title: "text-primary font-bold", // Title color
        },
      });
      return redirect("/login/google");
    },
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;

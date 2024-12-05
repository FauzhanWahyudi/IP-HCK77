"use client";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import Swal from "sweetalert2";
// import CustomGoogleButton from "../components/google_sign_button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loginGitHub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        import.meta.env.VITE_GITHUB_Client_ID,
    );
  };

  const getGitHubCode = () => {
    console.log(searchParams.get("code"), "CODE PARAMS");
  };

  const loginGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_Google_OAuth_Client_ID,
      callback: async (response) => {
        const { data } = await axios.post(
          "https://api.fauzhanwahyudi.com/auth/google",
          {
            googleToken: response.credential,
          },
        );
        localStorage.setItem("access_token", data.access_token);
        navigate("/"); // Redirect after login
        Swal.fire({
          icon: "success",
          title: "Login Success",
          timer: 2000,
        });
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "", size: "large" },
    );
    window.google.accounts.id.prompt(); // Optional prompt for One Tap dialog
  };

  useEffect(() => {
    loginGoogle();
    getGitHubCode();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-lg">
        <div className="card-body">
          <h1 className="text-center text-xl font-bold text-primary">
            Welcome Back! Please Log In
          </h1>

          {/* Google Login Button */}
          <button className="btn btn-outline bg-white hover:bg-white">
            <div id="buttonDiv" className="bg-base-100"></div>
          </button>
          {/* <CustomGoogleButton /> */}

          {/* GitHub Login Button */}
          <button
            onClick={loginGitHub}
            className="btn flex w-full items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-900"
          >
            <FaGithub size={20} />
            Login with GitHub
          </button>

          {/* Cancel Button */}
          <Link
            to="/"
            className="btn mt-4 bg-red-600 text-white hover:bg-red-800"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

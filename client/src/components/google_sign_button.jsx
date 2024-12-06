import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2";

// Get the client ID from the environment variables
const clientId = import.meta.env.VITE_Google_OAuth_Client_ID;

const CustomGoogleButton = () => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const { credential } = response; // Get the credential from the response
    console.log(response);
    try {
      // Send the Google token to your backend for authentication
      const { data } = await axios.post(
        "https://api.fauzhanwahyudi.com/auth/google",
        { googleToken: credential },
      );
      // Save the access token to localStorage
      localStorage.setItem("access_token", data.access_token);
      // Redirect to the home page after login
      navigate("/");
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Login Success",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
          title: "text-primary font-bold", // Title color
        },
        buttonsStyling: false, // Use your own button styles
      });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred during login.",
        customClass: {
          popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
          title: "text-primary font-bold", // Title color
        },
        buttonsStyling: false, // Use your own button styles
      });
    }
  };

  // Initialize Google login with the client ID and the success callback
  const login = useGoogleLogin({
    onSuccess,
    clientId, // Provide the client ID here
    flow: "popup", // This opens the Google sign-in flow in a popup
    scope: "openid profile email",
  });

  return (
    <div className="custom-google-button">
      <button
        onClick={() => login()} // Trigger Google login when the button is clicked
        className="btn w-full bg-primary text-white hover:text-primary"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default CustomGoogleButton;

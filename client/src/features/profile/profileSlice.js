import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";
const initialState = {
  value: {},
};

export const profileSlice = createSlice({
  name: "myCauldron",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const fetchProfile = () => async (dispatch) => {
  try {
    let { data } = await serverInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    let profile = data.profile;
    delete profile.createdAt;
    delete profile.updatedAt;
    dispatch(setProfile(profile));
  } catch (error) {
    console.log("🚀 ~ fetchProfile ~ error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
      customClass: {
        popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
        title: "text-danger font-bold", // Title color
      },
      buttonsStyling: false, // Use your own button styles
    });
  }
};

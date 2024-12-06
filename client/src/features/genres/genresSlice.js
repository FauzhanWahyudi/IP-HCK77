import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";

const initialState = {
  value: [],
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;

export const fetchGenres = () => async (dispatch) => {
  try {
    let { data } = await serverInstance.get("/genres");
    const genres = data.genres.map((genre) => {
      delete genre.createdAt;
      delete genre.updatedAt;
      return genre;
    });
    dispatch(setGenres(genres));
  } catch (error) {
    console.log("🚀 ~ fetchGenres ~ error:", error);
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

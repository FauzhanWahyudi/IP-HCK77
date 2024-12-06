import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../helpers/axiosInstance";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [cauldronName, setCauldronName] = useState("");
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value,
  );
  const profileRedux = useSelector((state) => state.profileReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCauldronProfile = async () => {
    await serverInstance.put(
      "/profile",
      {
        fullName,
        profilePicture,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    await serverInstance.put(
      `/cauldrons/${myCauldronsRedux[0]?.id}`,
      {
        name: cauldronName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    dispatch(fetchProfile());
    dispatch(fetchMyCauldron());
    navigate("/user/my-cauldron");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
        title: "text-primary font-bold", // Title color
        denyButton: "btn btn-danger",
        confirmButton: "btn btn-primary mx-2",
      },
      buttonsStyling: false, // Use your own button styles
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await updateCauldronProfile();
        Swal.fire({
          title: "Saved!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          customClass: {
            popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
            title: "text-primary font-bold", // Title color
          },
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Changes are not saved",
          icon: "warning",
          timer: 1000,
          showConfirmButton: false,
          customClass: {
            popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
            title: "text-primary font-bold", // Title color
          },
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyCauldron());
  }, []);

  useEffect(() => {
    setFullName(profileRedux.fullName);
    setProfilePicture(profileRedux.profilePicture);
    setCauldronName(myCauldronsRedux[0]?.name);
  }, [profileRedux]);

  return (
    <div className="my-4 flex items-center justify-center bg-base-100">
      <div className="card w-full max-w-3xl bg-base-300 text-primary shadow-lg">
        <div className="card-body">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-center">
              <img
                src={profilePicture}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-yellow-500 object-cover"
              />
            </div>

            <div>
              <label htmlFor="fullName" className="label text-yellow-400">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="label text-yellow-400">
                Profile Picture URL
              </label>
              <div className="flex w-full justify-between gap-1">
                <input
                  type="text"
                  id="profilePicture"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="input input-bordered w-7/12"
                  placeholder="Enter your profile picture URL"
                />
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-5/12 max-w-xs"
                />
              </div>
              <div className="container flex justify-between">
                <small className="text-secondary">
                  Please input your new profile picture URL.
                </small>
                <small className="text-secondary">
                  Or upload your local picture.
                </small>
              </div>
            </div>

            <div>
              <label htmlFor="cauldronName" className="label text-yellow-400">
                Cauldron Name
              </label>
              <input
                type="text"
                id="cauldronName"
                value={cauldronName}
                onChange={(e) => setCauldronName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your cauldron's name"
              />
            </div>

            <div className="mt-2 flex justify-center gap-4">
              <button
                type="submit"
                className="btn btn-outline btn-primary text-primary-content"
              >
                Edit Profile
              </button>
              <Link
                to="/"
                className="btn-danger text-danger btn hover:bg-red-500 hover:text-black"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

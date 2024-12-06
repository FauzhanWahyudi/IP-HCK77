import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import { setOpenModal } from "../features/openModal/openModal";
import {
  deletePotion,
  setPotion,
  updatePotion,
} from "../features/potion/potionSlice";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchProfile } from "../features/profile/profileSlice";

export default function MyCauldronPage() {
  const profileRedux = useSelector((state) => state.profileReducer.value);
  const openModalRedux = useSelector((state) => state.openModalReducer.value);
  const potionRedux = useSelector((state) => state.potionReducer.value);
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value,
  );
  const cauldronId = myCauldronsRedux?.[0]?.id;
  const filteredCauldron = myCauldronsRedux.filter(
    (cauldron) => cauldron.id == cauldronId,
  );
  const potions = filteredCauldron.map((cauldron) => cauldron?.Potion || []);
  const [recommendation, setRecommendation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenModal(false));
    dispatch(fetchMyCauldron());
    dispatch(fetchProfile());
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-100">
      <div className="my-4 w-full max-w-5xl overflow-auto rounded-lg bg-base-300 p-6 text-primary shadow-lg">
        {myCauldronsRedux.length > 0 ? (
          <>
            <div className="flex items-center justify-center gap-4">
              <img
                src={profileRedux.profilePicture}
                alt=""
                className="h-24 w-24 rounded-full border-4 border-yellow-500"
              />
              <h1 className="text-2xl font-bold text-yellow-500">
                {myCauldronsRedux[0]?.name}
              </h1>
              <Link to="/user/profile">
                <FaRegEdit className="cursor-pointer text-2xl text-yellow-500 hover:text-yellow-800" />
              </Link>
            </div>

            {potions.length > 0 ? (
              potions.map((potion) => (
                <div key={potion.id} className="my-4 flex justify-center">
                  <div className="w-11/12 rounded-lg bg-base-200 p-4 shadow-md hover:scale-105">
                    <p className="line-clamp-3 hover:line-clamp-none">
                      {potion.recommendation}
                    </p>
                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        className="badge badge-outline hover:font-extrabold hover:text-yellow-400"
                        onClick={() => {
                          dispatch(setOpenModal(true));
                          dispatch(setPotion(potion));
                          setRecommendation(potion.recommendation);
                        }}
                      >
                        Edit Potion
                      </button>
                      <button
                        className="badge badge-outline hover:font-extrabold hover:text-red-400"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Delete",
                            customClass: {
                              popup: "bg-base-100 text-primary shadow-lg", // Modal background and text color
                              title: "text-primary font-bold", // Title color
                              cancelButton: "btn btn-danger",
                              confirmButton: "btn btn-primary mx-2",
                            },
                            buttonsStyling: false, // Use your own button styles
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deletePotion(potion));
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-400">
                No potions available
              </h1>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg text-yellow-500"></span>
            <h1 className="mt-2 text-yellow-500">Loading your cauldron...</h1>
          </div>
        )}
      </div>

      {openModalRedux && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 text-white">
            <h2 className="text-center text-lg font-bold uppercase text-yellow-500 underline">
              Edit Potion
            </h2>
            <textarea
              className="textarea textarea-bordered mt-4 w-full bg-base-300 text-primary"
              rows={6}
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
            ></textarea>
            <div className="modal-action justify-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch(
                    updatePotion({
                      recommendation,
                      GenreId: potionRedux.GenreId,
                      CauldronId: cauldronId,
                      id: potionRedux.id,
                    }),
                  );
                  dispatch(fetchMyCauldron());
                  dispatch(setOpenModal(false));
                }}
              >
                Save Potion
              </button>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(setOpenModal(false))}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

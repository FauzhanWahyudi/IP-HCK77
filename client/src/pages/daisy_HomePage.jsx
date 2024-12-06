import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { fetchGenres } from "../features/genres/genresSlice";
import { getRecommendation } from "../features/recom/recomSlice";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import { fetchProfile } from "../features/profile/profileSlice";
import { postPotion } from "../features/potion/potionSlice";
import { setOpenModal } from "../features/openModal/openModal";
import { setGenreId } from "../features/genreId/genreIdSlice";

export default function HomePage() {
  const myCauldrons = useSelector((state) => state.myCauldronReducer.value);
  const genres = useSelector((state) => state.genresReducer.value);
  const genreId = useSelector((state) => state.genreIdReducer.value);
  const loading = useSelector((state) => state.loadingReducer.value);
  const isModalOpen = useSelector((state) => state.openModalReducer.value);
  const recommendation = useSelector(
    (state) => state.recommendationReducer.value,
  );

  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("Create your initial synopsis...");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(setOpenModal(true));
      if (synopsis === "Create your initial synopsis...") setSynopsis("");
      dispatch(getRecommendation(synopsis, genre));
    } catch (error) {
      console.error("Error submitting recommendation request:", error);
    }
  };

  const handleSavePotion = () => {
    dispatch(fetchMyCauldron());
    const cauldronId = myCauldrons[0]?.id;
    dispatch(postPotion(recommendation.recommendation, genreId, cauldronId));
    dispatch(setOpenModal(false));
    dispatch(fetchMyCauldron());
    navigate("/user/my-cauldron");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-base-100">
      {/* Input Card */}
      <div className="card w-full max-w-3xl bg-base-200 text-base-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-primary">
            Create Your Potion
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Synopsis Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter a brief synopsis:</span>
              </label>
              <textarea
                placeholder={synopsis}
                onChange={(event) => setSynopsis(event.target.value)}
                className="textarea textarea-bordered"
              />
            </div>

            {/* Genre Selector */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select a genre:</span>
              </label>
              <select
                className="select select-bordered"
                onChange={(event) => {
                  dispatch(setGenreId(event.target.selectedIndex));
                  setGenre(event.target.value);
                }}
              >
                <option disabled selected value="">
                  Choose a genre
                </option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">
                Request Potion
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recommendation Card */}
      {recommendation.recommendation && (
        <div
          className="card w-full max-w-3xl transform cursor-pointer bg-base-200 text-base-content shadow-xl transition-transform hover:scale-105"
          onClick={() => dispatch(setOpenModal(true))}
        >
          <div className="card-body">
            <div className="flex items-center gap-2">
              <GiClick size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">
                Click to view the full potion!
              </h3>
            </div>
            <p className="line-clamp-3">{recommendation.recommendation}</p>
          </div>
        </div>
      )}

      {/* Recommendation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 text-primary">
            <h1 className="mb-2 text-center text-yellow-500 underline">
              Concocted Potion
            </h1>
            {!loading ? (
              <p className="text-pretty text-justify">
                {recommendation.recommendation}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="loading loading-spinner loading-lg"></span>
                <h1 className="text-yellow-500">
                  Please wait, concoction in progress...
                </h1>
              </div>
            )}
            <div className="modal-action justify-center">
              <button onClick={handleSavePotion} className="btn btn-primary">
                Save Potion
              </button>
              <button
                onClick={() => dispatch(setOpenModal(false))}
                className="btn-danger btn"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

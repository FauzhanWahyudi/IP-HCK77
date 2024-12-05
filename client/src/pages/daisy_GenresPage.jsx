"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../features/genres/genresSlice";
import { setGenreId } from "../features/genreId/genreIdSlice";
import { getRecommendation } from "../features/recom/recomSlice";
import { setOpenModal } from "../features/openModal/openModal";

export default function GenresPage() {
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRecomOnClick = (genre) => {
    dispatch(setOpenModal(true));
    dispatch(getRecommendation("", genre));
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div className="my-4 flex items-center justify-center bg-base-100">
      <div className="w-full max-w-4xl rounded-lg bg-base-300 p-2 text-yellow-400 shadow-lg">
        {genresRedux && genresRedux.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead className="uppercase text-base-content underline">
                <tr>
                  <th>Genres</th>
                  <th>MyAnimeList Link</th>
                  <th>Potion</th>
                </tr>
              </thead>
              <tbody>
                {genresRedux.map((genre, index) => (
                  <tr key={index + 1}>
                    <td className="font-semibold">{genre.name}</td>
                    <td>
                      <Link
                        to={genre.url}
                        className="text-yellow-700 hover:text-primary hover:underline"
                      >
                        Go to MyAnimeList
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-warning"
                        onClick={() => {
                          dispatch(setGenreId(genre.id));
                          getRecomOnClick(genre.name);
                        }}
                      >
                        Request Potion
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-yellow-500"></span>
            <h1 className="mt-2 text-yellow-500">Loading your genres...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

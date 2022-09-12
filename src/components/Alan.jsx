import React, { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { selectGenreOrCategory, searchMovie } from "../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useAlan = () => {
    const history = useHistory()
    const dispatch = useDispatch()
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
       if (command === "chooseGenre") {
         const foundGenre = genres.find(
           (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
         );

         if (foundGenre) {
           history.push("/movie_empire");
           dispatch(selectGenreOrCategory(foundGenre.id));
         } else {
           const category = genreOrCategory.startsWith("top")
             ? "top_rated"
             : genreOrCategory;
           history.push("/movie_empire");
           dispatch(selectGenreOrCategory(category));
         }
       } else if (command === "changeMode") {
         if (mode === "light") {
           setMode("light");
         } else {
           setMode("dark");
         }
       } else if (command === "login") {
         fetchToken();
       } else if (command === "logout") {
         localStorage.clear();
         history.push("/movie_empire");
       } else if (command === "search") {
         dispatch(searchMovie(query));
       }
      },
    });
  }, []);
};

export default useAlan;

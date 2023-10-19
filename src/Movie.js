import movies_schedule_list from "./movies_list";
import { useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import generateGenres from "./generate_genres_service";
import SearchFilter from "./SearchFilter";
import FilterDropDown from "./FilterDropDown";

export default function MovieList() {
  const [genre, setGenre] = useState("");
  const [filteredSchedules, setfilteredSchedules] = useState([]);
  const [query, setQuery] = useState("");
  let genres = generateGenres();

  const handleChange = (e) => {
    //callback after selecting genre from filter
    e.preventDefault();
    let genre = e.target.value;
    if (e.target.value == "default") {
      genre = "";
    }
    setGenre(genre);
  };

  useEffect(() => {
    //Maintaining a structure to manage the rowspans when filter and search queries are updated
    let newFilterSchedule = {};
    for (let schedule in movies_schedule_list) {
      newFilterSchedule[movies_schedule_list[schedule]["date"]] = 0;
      let movieList = movies_schedule_list[schedule]["movies"];
      if (genre) {
        movieList = movieList.filter((movie) => movie.genre.includes(genre));
      }
      if (query) {
        movieList = movieList.filter((movie) =>
          movie.title.toLowerCase().includes(query)
        );
      }
      newFilterSchedule[movies_schedule_list[schedule]["date"]] =
        movieList.length;
    }
    setfilteredSchedules(newFilterSchedule);
  }, [genre, query]);

  return (
    <div>
      <SearchFilter onChange={(e) => setQuery(e.target.value)} />
      <FilterDropDown onChange={(e) => handleChange(e)} genres={genres} />

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Day</th>
            <th>Title</th>
            <th>Poster</th>
            <th>Genre(s)</th>
            <th>Rating</th>
            <th>Year Release</th>
            <th>Metacritic Rating</th>
            <th>Runtime</th>
          </tr>
        </thead>
        <tbody>
          {movies_schedule_list.map((schedule, i) => (
            <>
              {schedule["movies"]
                .filter((movie) => (genre ? movie.genre.includes(genre) : true))
                .filter((movie) =>
                  query ? movie.title.toLowerCase().includes(query) : true
                )
                .map((movie, j) => (
                  <tr key={i + j}>
                    {j == 0 && (
                      <th rowSpan={filteredSchedules[schedule.date]}>
                        {new Date(schedule.date).toLocaleString("default", {
                          month: "long"
                        })}
                      </th>
                    )}

                    {j == 0 && (
                      <th rowSpan={filteredSchedules[schedule.date]}>
                        {new Date(schedule.date).getDate()}
                      </th>
                    )}

                    <td>{movie.title}</td>
                    <td>
                      <img src={movie.poster} />
                    </td>
                    <td>{movie.genre.toString()}</td>
                    <td>{movie.imdb_rating}</td>
                    <td>{movie.released}</td>
                    <td>{movie.imdb_rating}</td>
                    <td>{movie.runtime}</td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

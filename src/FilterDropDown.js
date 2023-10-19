import React from "react";

export default function FilterDropDown({ onChange, genres }) {
  return (
    <select defaultValue={"default"} onChange={onChange}>
      <option key={"default"} value={"default"}>
        What is your genre?
      </option>
      {genres.map((genreConsidered, index) => (
        <option key={genreConsidered} value={genreConsidered}>
          {" "}
          {genreConsidered}
        </option>
      ))}
    </select>
  );
}

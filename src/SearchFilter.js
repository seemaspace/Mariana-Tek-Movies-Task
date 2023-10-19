import React from "react";

export default function SearchFilter({ onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="search"
      onChange={onChange}
    ></input>
  );
}

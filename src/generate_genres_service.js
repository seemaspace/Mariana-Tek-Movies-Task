import movies_schedule_list from "./movies_list";

export default function generateGenres() {
  let genres = new Set();
  for (let schedule in movies_schedule_list) {
    for (let movie in movies_schedule_list[schedule]["movies"]) {
      //console.log(movies_schedule_list[schedule]["movies"][movie]["genre"]);
      movies_schedule_list[schedule]["movies"][movie]["genre"].forEach((item) =>
        genres.add(item)
      );
    }
  }
  genres = [...genres];
  return genres;
}

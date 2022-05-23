import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Series from "./Routes/TvShows";
import Movie from "./Routes/Movie";
import Latest from "./Routes/Latest";
import MyList from "./Routes/my-list";
import Header from "./components/header/index";
import Search from "./Routes/Search";

function Router() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/tvshows" element={<Series />} />
				<Route path="/movies" element={<Movie />} />
				<Route path="/latest" element={<Latest />} />
				<Route path="/my-list" element={<MyList />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
